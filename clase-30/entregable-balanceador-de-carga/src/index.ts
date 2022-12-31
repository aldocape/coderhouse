// import config from './config';
import { PORT, MODE, numCPUs, myHTTPServer } from './services/server';

// La conexión a la base de datos de MongoDB Atlas la ejecuto directamente en el script database
import './services/database';
import cluster from 'cluster';

/* --------------------------------------------------------------------------- */
/* MASTER */

if (MODE === 'cluster' && cluster.isPrimary) {
  console.log(`PID MASTER ${process.pid}`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code) => {
    console.log(
      `Worker ${worker.process.pid} died with code ${code} at ${Date()}`
    );
    cluster.fork();
  });
} else {
  /* --------------------------------------------------------------------------- */
  /* WORKERS */
  console.log(`PID WORKER ${process.pid}`);
  myHTTPServer.listen(PORT, () => {
    console.log(`🚀 Servidor escuchando en el puerto ${PORT}`);
  });

  // En caso de error, lo muestro a través del método 'on' sobre la salida de 'listen'
  myHTTPServer.on('error', (error: any) =>
    console.log(`Error en servidor ${error}`)
  );
}
