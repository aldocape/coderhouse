const express = require('express');
const path = require('path');
const mainRouter = require('../routes/index');

/** INICIALIZACION API con EXPRESS */
const app = express();

// Disponibilizo carpeta 'public' para acceder a los estilos css
const publicPath = path.resolve(__dirname, '../../public');
app.use(express.static(publicPath));

// Le indico que voy a usar el motor de plantillas 'ejs'
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index');
});

app.use(express.json()); //permite json
app.use(express.urlencoded({ extended: true })); //permite form data

app.use('/api', mainRouter);

module.exports = app;
