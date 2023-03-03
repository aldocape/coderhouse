"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const products_routes_1 = __importDefault(require("./products.routes"));
const carts_routes_1 = __importDefault(require("./carts.routes"));
const messages_routes_1 = __importDefault(require("./messages.routes"));
const users_routes_1 = __importDefault(require("./users.routes"));
const random_1 = __importDefault(require("./random"));
// import emailRouter from './email';
const router = (0, express_1.Router)();
// La ruta raíz redirecciona a /home para poder hacer la verificación de usuario logueado
router.get('/', (req, res) => {
    res.redirect('/home');
});
// En este caso, el router de 'users' no está en el endpoint '/api/usuarios'
// porque abarca también las funciones de login, logout, y register, que funcionan en otros endpoint
router.use('/', users_routes_1.default);
router.use('/api/productos', products_routes_1.default);
router.use('/api/carrito', carts_routes_1.default);
router.use('/api/mensajes', messages_routes_1.default);
router.use('/api/randoms', random_1.default);
// router.use('/api/', emailRouter);
exports.default = router;
