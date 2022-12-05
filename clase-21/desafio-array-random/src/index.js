const nombres = ['Luis', 'Lucía', 'Juan', 'Augusto', 'Ana'];
const apellidos = ['Pieres', 'Cacurri', 'Bezzola', 'Alberca', 'Mei'];
const colores = ['rojo', 'verde', 'azul', 'amarillo', 'magenta'];

const express = require('express');

const app = express();

const between = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};

const devolverAleatorios = (req, res) => {
  const respuesta = [];

  for (let index = 0; index < 10; index++) {
    respuesta.push({
      nombre: nombres[between(0, nombres.length)],
      apellido: apellidos[between(0, apellidos.length)],
      color: colores[between(0, colores.length)],
    });
  }

  res.json(respuesta);
};

const PORT = 8080;

app.get('/test', devolverAleatorios);

app.listen(PORT, () => {
  console.log(`App escuchando en puerto ${PORT}`);
});
