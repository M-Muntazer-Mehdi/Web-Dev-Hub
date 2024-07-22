
var express = require("express");
var cors = require("cors");

var app = express();

app.use(cors());

var mysql = require("mysql");

var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set("view engine", "ejs");

var conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "abubakar",
});

conn.connect(function (err) {
  if (err) throw err;

  console.log("Connection Sucessful");
});

app.get("/", function (req, res) {
  res.render("insert");
});

app.post("/insert", function (req, res) {
  var fname = req.body.firstname;
  var lname = req.body.lastname;
  var email = req.body.email;
  var phone = req.body.phone;
  var date = req.body.date;
  var details=req.body.details;
  var gender=req.body.gender;
  var latitude=req.body.latitude;
  var logitude=req.body.longitude;
  
  

  var sql = `insert into lostsystem values( ' ' ,'${fname}', '${lname}', '${email}', '${phone}', '${date}', '${details}', '${gender}', '${latitude}', '${logitude}')`;

  conn.query(sql, function (err, results) {
    if (err) throw err;
 
    res.send("<h1>Data Inserted.</h1>");
  });
});



var server = app.listen(4030, function () {
  console.log("App running on port 4000");
});

