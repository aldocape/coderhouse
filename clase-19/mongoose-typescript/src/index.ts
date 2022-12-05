import 'dotenv/config';
import server from './services/server';
import { initMongoDB } from './services/database';

const init = async () => {
  await initMongoDB();

  const PORT = process.env.PORT || 8080;

  server.listen(PORT, () => {
    console.log(`🚀 Servidor escuchando en el puerto ${PORT}`);
  });

  // En caso de error, lo muestro a través del método 'on' sobre la salida de 'listen'
  server.on('error', (error: any) => console.log(`Error en servidor ${error}`));
};

init();
