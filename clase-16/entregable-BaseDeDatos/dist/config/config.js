"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdmin = exports.PORT = void 0;
// Utilizo el puerto de escucha 8080 para desarrollo y process.env.PORT para producción en glitch.com
const PORT = process.env.PORT || 8080;
exports.PORT = PORT;
// Variable booleana para indicar si el usuario es o no un Administrador
const isAdmin = false;
exports.isAdmin = isAdmin;
