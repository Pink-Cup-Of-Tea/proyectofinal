const express = require('express');
require('dotenv').config();
const path = require('path');
const hbs = require('hbs');
const mysql = require('mysql2');
const nodemailer = require('nodemailer');
const async = require('hbs/lib/async');
const app = express();
const PORT = process.env.PORT;

//Conexion a la Base de Datos
const conexion = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE
});

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
app.use(express.static(path.join(__dirname, 'public')));

//Configuracion del Motor de Plantillas
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
hbs.registerPartials(path.join(__dirname, 'views/partials'));

//conexion.end();


app.get('/', (req, res) =>{
  res.render('index', {
    style: 'index.css'
  })
});


app.get('/recetasdulces', (req, res) =>{
  res.render('recetasdulces', {
    titulo: 'recetasdulces',
    style: 'recetasdulces.css'
  })
});


app.get('/recetassaladas', (req, res) =>{
  res.render('recetassaladas',{
    titulo:'Recetas Saladas',
    style: 'recetassaladas.css'
  })
});

app.get('/contactanos', (req, res) =>{
  res.render('contactanos', {
    titulo: 'Contactanos',
    style: 'contactanos.css'
  })
});

app.post('/contactanos', (req, res) => {

  let comentario = req.body.comentario;

  if (comentario == '') {
      let validacion = 'Rellene los campos correctamente..';
      res.render('contactanos', {
          validacion
      });
  } else {

      let datos = {
        comentario: comentario
      };

      let sql = 'INSERT INTO seikadb.recetas SET ?';

      conexion.query(sql, datos, (err, result) => {
          let envioDatos = 'Datos Enviados Con Éxito'
          if (err) throw err;
          res.render('contactanos', {
              envioDatos
          });
      });
  }
});

app.listen(PORT, () => {
  console.log(`El servidor esta trabajando en el Puerto ${PORT}`);
});


