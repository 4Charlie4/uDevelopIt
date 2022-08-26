const mysql = require("mysql2");


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

  module.exports = db;