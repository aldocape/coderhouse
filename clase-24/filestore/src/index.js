import server from './services/server';

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Servidor express escuchando en el puerto ${PORT}`);
});
