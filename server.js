const express = require("express");
const { createTestScheduler } = require("jest");
const mysql = require("mysql2");
const inputCheck = require("./utils/inputCheck");

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//connects to Database
const db = mysql.createConnection(
  {
    host: "localhost",

    user: "root",

    password: "rcP9b1Lw3GnkX&duvF",

    database: "election",
  },
  console.log("Connected to the election database.")
);

app.get("/api/candidates", (req, res) => {
  const sql = `SELECT * FROM candidates`;
  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: "Success",
      data: rows,
    });
  });
});

//query's for one candidate
app.get("/api/candidate/:id", (req, res) => {
  const sql = `SELECT * FROM candidates WHERE id = ?`;
  const params = [req.params.id];
  db.query(sql, params, (err, row) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "Success",
      data: row,
    });
  });
});

//Delete a candidate (use place holder to avoid SQL injection)
app.delete("/api/candidate/:id", (req, res) => {
  const sql = `DELETE FROM candidates WHERE id = ?`;
  const params = [req.params.id];
  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: res.message });
    } else if (!result.affectedRows) {
      res.json({
        message: "Candidate not found. Try again.",
      });
    } else {
      res.json({
        message: "Deleted",
        changes: result.affectedRows,
        id: req.params.id,
      });
    }
  });
});

//Create a candidate
app.post("/api/candidate", ({ body }, res) => {
  const errors = inputCheck(
    body,
    "first_name",
    "last_name",
    "industry_connected"
  );
  if (errors) {
    res.status(400).json({ errors: errors });
    return;
  }

  const sql = `INSERT INTO candidates (first_name, last_name, industry_connected)
  VALUES(?,?,?)`;
  const params = [body.first_name, body.last_name, body.industry_connected];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "Created",
      data: body,
    });
  });
});

//default response for request that fail/not found(Catchall route) always place at the bottom
app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
