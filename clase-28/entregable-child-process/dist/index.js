"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import config from './config';
const server_1 = require("./services/server");
// La conexión a la base de datos de MongoDB Atlas la ejecuto directamente en el script database
require("./services/database");
server_1.myHTTPServer.listen(server_1.PORT, () => {
    console.log(`🚀 Servidor escuchando en el puerto ${server_1.PORT}`);
});
// En caso de error, lo muestro a través del método 'on' sobre la salida de 'listen'
server_1.myHTTPServer.on('error', (error) => console.log(`Error en servidor ${error}`));
