import express from 'express';
import mainRouter from '../routes/index.js';

const app = express();

app.use(express.json());

app.use('/api', mainRouter);

app.use('/', (req, res) => {
  res.json('Hola');
});

export default app;
