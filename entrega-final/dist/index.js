"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cluster = require('cluster');
const server_1 = require("./services/server");
/* --------------------------------------------------------------------------- */
/* MASTER */
if (server_1.MODE === 'cluster' && cluster.isPrimary) {
    for (let i = 0; i < server_1.numCPUs; i++) {
        cluster.fork();
    }
    cluster.on('exit', (worker, code) => {
        // logger.error(
        //   `Worker ${worker.process.pid} died with code ${code} at ${Date()}`
        // );
        cluster.fork();
    });
}
else {
    /* --------------------------------------------------------------------------- */
    /* WORKERS */
    //   logger.info(`PID WORKER ${process.pid}`);
    server_1.myHTTPServer.listen(server_1.PORT, () => {
        // logger.info(`🚀 Servidor escuchando en el puerto ${PORT}`);
        console.log(`🚀 Servidor escuchando en el puerto ${server_1.PORT}`);
    });
    // En caso de error, lo muestro a través del método 'on' sobre la salida de 'listen'
    server_1.myHTTPServer.on('error', (error) => 
    // logger.error(`Error en servidor ${error}`)
    console.log(`Error en servidor ${error}`));
}
