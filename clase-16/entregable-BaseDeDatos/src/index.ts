import server from './services/server';
import { PORT } from './config/config';

server.listen(PORT, () => {
  console.log(`🚀 Servidor escuchando en el puerto ${PORT}`);
});

// En caso de error, lo muestro a través del método 'on' sobre la salida de 'listen'
server.on('error', (error: any) => console.log(`Error en servidor ${error}`));
