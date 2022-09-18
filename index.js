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

conexion.connect((err) => {
  if (err) {
    console.error(`Error en la conexion: ${err.stack}`);
  console.log(`Conectado a la Base de Datos ${process.env.DATABASE}`)
  return;
  }
});

//conexion.connect();

//Configurar Middelwares
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname, 'public')))

app.listen(PORT, () => {
  console.log('El servidor esta trabajando en el Puerto ${PORT}');
});
