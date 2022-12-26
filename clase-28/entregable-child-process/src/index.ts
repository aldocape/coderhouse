// import config from './config';
import { PORT, myHTTPServer } from './services/server';

// La conexión a la base de datos de MongoDB Atlas la ejecuto directamente en el script database
import './services/database';

myHTTPServer.listen(PORT, () => {
  console.log(`🚀 Servidor escuchando en el puerto ${PORT}`);
});

// En caso de error, lo muestro a través del método 'on' sobre la salida de 'listen'
myHTTPServer.on('error', (error: any) =>
  console.log(`Error en servidor ${error}`)
);
