const express = require("express");
const app = express();
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var cors = require("cors");


app.use(cors());

var mysql = require("mysql");


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

app.post("/insert", function (req, res) {
  var name = req.body.name;
  
  var email = req.body.email;
  var password = req.body.password;
 
  
  

  var sql = `insert into Email( ID,Name, Email, Password) values( ' ' ,'${name}', '${email}', '${password}')`;

  conn.query(sql, function (err, results) {
    if (err) throw err;
 
    res.send("<h1>Data Inserted.</h1>");
  });
});


app.post("/send-code", (req, res) => {
  const { name, email, code } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "f201023@cfd.nu.edu.pk",
      pass: "03074659133",
    },
  });

  const mailOptions = {
    from: "f201023@cfd.nu.edu.pk",
    to: email,
    subject: "Authentication Code",
    text: `Hi ${name},\n\nYour authentication code is: ${code}\n\nBest regards,\nAuthentication Team`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      res.status(500).send("Failed to send code.");
    } else {
      console.log("Email sent: " + info.response);
      res.send("Code sent to your email address.");
    }
  });
});



app.listen(3000, () => {
  console.log("Server started on port 3000");
});
