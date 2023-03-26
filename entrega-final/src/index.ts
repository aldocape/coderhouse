const cluster = require('cluster');
import logger from './middlewares/logger';
import { PORT, MODE, numCPUs, myHTTPServer } from './services/server';

/* --------------------------------------------------------------------------- */
/* MASTER */

if (MODE === 'cluster' && cluster.isPrimary) {
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker: any, code: any) => {
    logger.error(
      `Worker ${worker.process.pid} died with code ${code} at ${Date()}`
    );
    cluster.fork();
  });
} else {
  /* --------------------------------------------------------------------------- */
  /* WORKERS */

  //   logger.info(`PID WORKER ${process.pid}`);

  myHTTPServer.listen(PORT, () => {
    logger.info(`🚀 Servidor escuchando en el puerto ${PORT}`);
  });

  // En caso de error, lo muestro a través del método 'on' sobre la salida de 'listen'
  myHTTPServer.on('error', (error: any) =>
    // logger.error(`Error en servidor ${error}`)
    console.log(`Error en servidor ${error}`)
  );
}
