import express from 'express';

import Color from '../color';

const colorAleatorio = new Color();

console.log(
  `El resultado del color aleatorio es: ${JSON.stringify(colorAleatorio)}`
);

const app = express();

app.get('/', (req, res) => {
  const colorLetra = `rgb(${colorAleatorio.color.rojo}, ${colorAleatorio.color.verde}, ${colorAleatorio.color.azul})`;
  res.send(`<h1 style="color:${colorLetra}">Holaaa</h1>`);
});

export default app;
