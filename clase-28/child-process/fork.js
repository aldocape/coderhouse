import express from 'express';
import { fork } from 'child_process';

import { calculo } from './utils/calculo.js';
const scriptPath = './utils/calculo.js';

const app = express();

let visitas = 0;

// Servidor bloqueante
app.get('/', (req, res) => {
  visitas += 1;
  res.json({
    message: 'Servidor Bloqueante con /calculo y no bloqueante con /calculo2',
    visitas,
  });
});

app.get('/calculo', (req, res) => {
  const resultado = calculo();
  res.json({
    resultado,
  });
});

app.get('/calculo2', (req, res) => {
  const computo = fork(scriptPath);
  computo.send('start');
  computo.on('message', (sum) => {
    res.json({
      resultado: sum,
    });
  });
});

const puerto = 8080;

const server = app.listen(puerto, () => {
  console.log(`Servidor Bloqueante escuchando en el puerto ${puerto}`);
});

server.on('error', (error) => console.log(`Error en servidor: ${error}`));
