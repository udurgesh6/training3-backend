const express = require("express");
const mysql = require("mysql2");
const PORT = 8080;
const cors = require("cors");
const bodyParser = require("body-parser");
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
app.use(bodyParser.json());
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

app.get("/employees", (req, res) => {
  con.query(`SELECT * FROM happyagility.Testing`, function (err, result) {
    if (err) res.send(err);
    if (result) res.send(result);
  });
});

app.post("/employees/add", (req, res) => {
  console.log(req.body);
  con.query(
    `INSERT INTO happyagility.Testing (testing_id, name, age) VALUES ('${req.body.testing_id}','${req.body.name}', ${req.body.age})`,
    function (err, result) {
      if (err) res.send(err);
      if (result) res.send(result);
    }
  );
});
