const express = require("express"); //import express module ด้วยการใช้คำสั่ง แล้ว assign ตัวแปร express ให้เป็น module ที่ import เข้ามา
const app = express(); //สร้าง instance ของ Express application
const PORT = 8080; //set port
const mysql = require("mysql2");

require('dotenv').config() //import config env

var cors = require('cors') //import module ชื่อ cors Cross-Origin Resource Sharing
app.use(cors())

app.use(express.json()); //convert request body to json


//request response to send return list 
app.get('/', (req, res) => {
  res.status(200).json("Status is OK"); //status 200 is ok not proble,
})


const setDB = mysql.createPool({
  host: "localhost" || process.env.db_host,
  user: "root" || process.env.db_user,
  password: "1234" || process.env.db_password,
  database: "database" || process.env.db_database,
});

//swagger
const swaggerDocument = require("./swagger.json")
const swaggerUI = require("swagger-ui-express");

app.use(
  '/api-docs',
  swaggerUI.serve,
  swaggerUI.setup(swaggerDocument)
);

app.get("/rootofequation", (req, res) => {
  const query = `SELECT * FROM rootofequation`;
  setDB.query(query, (err, data) => {
    if (err) return res.send(err);
    return res.send(data);
  });
});

app.get("/rootofequation/:id", (req, res) => {
  const id = req.params.id;
  const query = `SELECT * FROM rootofequation WHERE id = ${id}`;
  setDB.query(query, (err, data) => {
    if (err) return res.send(err);
    return res.send(data);
  });
});


//token
const jwt = require('jsonwebtoken');

const secretKey = 'test';

//convert token
app.get("/gettoken/:name", (req, res) => {
  const token = jwt.sign({ user: req.params.name }, secretKey); //sign to convert secret key to something
  res.send(token);
});

function authorization(req, res, next) {
  let token = req.headers["authorization"];
  if (token == undefined) {
    res.send("don't have authorization");
  } else {
    try {
      token = token.split(" ")[1];
      let decode = jwt.verify(token, secretKey);
      if (decode.user == "arm") {
        next();
      } else {
        res.send("pls authen");
      }
    } catch {
      res.send("no correct");
    }
  }
}

app.get("/rootofequations", authorization,(req, res) => {
  const query = `SELECT * FROM rootofequation `;
  setDB.query(query, (err, data) => {
    if (err) return res.send(err);
    return res.send(data);
  });
});

//start server
app.listen(PORT, () => console.log('Running...'))

module.exports = app