"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cluster = require('cluster');
const server_1 = require("./services/server");
const logger_1 = __importDefault(require("./middlewares/logger"));
/* --------------------------------------------------------------------------- */
/* MASTER */
if (server_1.MODE === 'cluster' && cluster.isPrimary) {
    logger_1.default.info(`PID MASTER ${process.pid}`);
    for (let i = 0; i < server_1.numCPUs; i++) {
        cluster.fork();
    }
    cluster.on('exit', (worker, code) => {
        logger_1.default.error(`Worker ${worker.process.pid} died with code ${code} at ${Date()}`);
        cluster.fork();
    });
}
else {
    /* --------------------------------------------------------------------------- */
    /* WORKERS */
    logger_1.default.info(`PID WORKER ${process.pid}`);
    server_1.myHTTPServer.listen(server_1.PORT, () => {
        logger_1.default.info(`🚀 Servidor escuchando en el puerto ${server_1.PORT}`);
    });
    // En caso de error, lo muestro a través del método 'on' sobre la salida de 'listen'
    server_1.myHTTPServer.on('error', (error) => logger_1.default.error(`Error en servidor ${error}`));
}
