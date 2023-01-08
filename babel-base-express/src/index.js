import express from 'express';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    msg: 'ok',
  });
});

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Servidor express escuchando en el puerto ${PORT}`);
});
