const express = require('express');
const path = require('path');

/** INICIALIZACION API con EXPRESS */
const app = express();
const puerto = 8080;
const server = app.listen(puerto, () =>
  console.log('Server up en puerto', puerto)
);

const publicPath = path.resolve(__dirname, '../public');
app.use(express.static(publicPath));

app.set('view engine', 'ejs');
// const viewsPath = path.resolve(__dirname, '../views');
// app.set('views', viewsPath);

app.get('/', (req, res) => {
  res.render('pages/index'); // Se muestra la plantilla index
});

app.get('/datos', (req, res) => {
  console.log(req.query);
  const data = {
    min: req.query.min,
    max: req.query.max,
    nivel: req.query.nivel,
    titulo: req.query.titulo,
  };
  res.render('pages/datos', data); // Se muestra la plantilla datos
});
