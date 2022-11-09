"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./services/server"));
const config_1 = require("./config/config");
server_1.default.listen(config_1.PORT, () => {
    console.log(`🚀 Servidor escuchando en el puerto ${config_1.PORT}`);
});
