const express = require("express");
const inputCheck = require("./utils/inputCheck");
const db = require("./db/connection");
const apiRoutes = require("./routes/apiRoutes");

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api", apiRoutes);

//default response for request that fail/not found(Catchall route) always place at the bottom
app.use((req, res) => {
  res.status(404).end();
});

db.connect((err) => {
  if (err) throw err;
  console.log("Database connected.");

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
