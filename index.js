const express = require("express");
const mysql = require("mysql2");
const PORT = 8080;
const cors = require("cors");

require("dotenv").config();

const con = mysql.createConnection({
  host: process.env.mysqlhost,
  user: process.env.mysqluser,
  password: process.env.mysqlpassword,
  database: process.env.mysqldatabase,
});

const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

app.get("/employees", (req, res) => {
  console.log(req.query);
  con.query(`SELECT * FROM happyagility.Testing`, function (err, result) {
    if (err) res.send("Error Message");
    if (result) res.send(result);
  });
});
