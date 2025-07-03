const mysql = require("mysql");

const db = mysql.createConnection({
  host: "sql12.freesqldatabase.com",
  user: "sql12788166",
  password: "kB1iXL1ivH",
  database: "sql12788166",
  port: 1000
});

db.connect((err) => {
  if (err) {
    console.error("DB connection failed:", err.message);
  } else {
    console.log("Connected to remote DB!");
  }
});

module.exports = db;
