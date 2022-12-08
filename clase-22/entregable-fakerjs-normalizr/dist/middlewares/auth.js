"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config/config");
// Middleware de autenticación de usuario (si es o no un Administrador)
const authenticate = (req, res, next) => {
    if (config_1.isAdmin)
        next();
    else {
        res.status(401).json({
            error: -1,
            msg: `ruta '${req.baseUrl}' método '${req.method}' no autorizada`,
        });
    }
};
exports.default = authenticate;
