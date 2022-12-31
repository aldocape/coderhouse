"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import config from './config';
const server_1 = require("./services/server");
// La conexión a la base de datos de MongoDB Atlas la ejecuto directamente en el script database
require("./services/database");
const cluster_1 = __importDefault(require("cluster"));
/* --------------------------------------------------------------------------- */
/* MASTER */
if (server_1.MODE === 'cluster' && cluster_1.default.isPrimary) {
    console.log(`PID MASTER ${process.pid}`);
    for (let i = 0; i < server_1.numCPUs; i++) {
        cluster_1.default.fork();
    }
    cluster_1.default.on('exit', (worker, code) => {
        console.log(`Worker ${worker.process.pid} died with code ${code} at ${Date()}`);
        cluster_1.default.fork();
    });
}
else {
    /* --------------------------------------------------------------------------- */
    /* WORKERS */
    console.log(`PID WORKER ${process.pid}`);
    server_1.myHTTPServer.listen(server_1.PORT, () => {
        console.log(`🚀 Servidor escuchando en el puerto ${server_1.PORT}`);
    });
    // En caso de error, lo muestro a través del método 'on' sobre la salida de 'listen'
    server_1.myHTTPServer.on('error', (error) => console.log(`Error en servidor ${error}`));
}
