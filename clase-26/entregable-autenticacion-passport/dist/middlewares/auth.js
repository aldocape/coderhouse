"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Modificar esta variable por la info de sesión cuando esté implementado
const isAdmin = true;
// Middleware de autenticación de usuario (si es o no un Administrador)
const authenticate = (req, res, next) => {
    if (isAdmin)
        next();
    else {
        res.status(401).json({
            error: -1,
            descripcion: `ruta '${req.baseUrl}' método '${req.method}' no autorizada`,
        });
    }
};
exports.default = authenticate;
