"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("./config"));
const server_1 = __importDefault(require("./services/server"));
// La conexión a la base de datos de MongoDB Atlas la ejecuto directamente en el script database
require("./services/database");
// Utilizo el puerto de escucha 8080 para desarrollo y process.env.PORT para producción
const PORT = config_1.default.PORT;
server_1.default.listen(PORT, () => {
    console.log(`🚀 Servidor escuchando en el puerto ${PORT}`);
});
// En caso de error, lo muestro a través del método 'on' sobre la salida de 'listen'
server_1.default.on('error', (error) => console.log(`Error en servidor ${error}`));
