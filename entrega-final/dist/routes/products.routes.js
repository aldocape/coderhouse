"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const products_controllers_1 = require("../controllers/products.controllers");
// Importo middleware de autenticación de usuario autorizado
const auth_1 = __importDefault(require("../middlewares/auth"));
const auth_jwt_1 = require("../utils/auth_jwt");
// Importo middleware para validación de datos para carga y edición de productos
const inputValidation_1 = require("../middlewares/inputValidation");
const router = (0, express_1.Router)();
// Recibe y agrega un producto, y lo devuelve con su id asignado
// Endpoint: /api/productos    Método: POST
router.post('/', auth_jwt_1.checkAuth, inputValidation_1.middlewareValidatorInsert, products_controllers_1.saveController);
// Devuelvo todos los productos
// Endpoint: /api/productos    Método: GET
router.get('/', products_controllers_1.getAllController);
// Devuelvo un producto según su id
// Endpoint: /api/productos/:id    Método: GET
router.get('/:id', products_controllers_1.getProdByIdController);
// Recibe un id y actualiza un producto, en caso de existir
// Endpoint: /api/productos/:id    Método: PUT
router.put('/:id', auth_1.default, inputValidation_1.middlewareValidatorUpdate, products_controllers_1.updateProdController);
// Elimina un producto según su id
// Endpoint: /api/productos/:id    Método: DELETE
router.delete('/:id', auth_1.default, products_controllers_1.deleteProdByIdController);
exports.default = router;
