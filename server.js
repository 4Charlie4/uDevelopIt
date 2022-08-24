const express = require("express");
const mysql = require("mysql2");

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

//default response for request that fail/not found(Catchall route) always place at the bottom
app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
