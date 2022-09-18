const express = require('express');
require('dotenv').config();
const path = require('path');
const hbs = require('hbs');
const mysql = require('mysql2');
const nodemailer = require('nodemailer');
const async = require('hbs/lib/async');
const app = express();
const PORT = process.env.PORT || 8080;



//Conexion a la Base de Datos
const conexion = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE
})

const conectar = async (
  await conexion.connect((error) =>{
    if(error) throw error;
    console.log('Conexion a la Data Base exitosa');
  })
)

conectar();

app.listen(PORT, () => {
  console.log('El servidor esta trabajando en el Puerto ${PORT}');
});
