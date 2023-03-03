"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const messages_controllers_1 = require("../controllers/messages.controllers");
// Importo middleware de autenticación de usuario autorizado
const auth_1 = __importDefault(require("../middlewares/auth"));
// Importo middleware para validación de datos para carga y edición de productos
const inputValidation_1 = require("../middlewares/inputValidation");
const router = (0, express_1.Router)();
// Devuelvo todos los mensajes
// Endpoint: /api/mensajes/ Método: GET
router.get('/', messages_controllers_1.getAllController);
// Devuelvo todos los mensajes normalizados
// Endpoint: /api/mensajes/normalized/ Método: GET
router.get('/normalized', messages_controllers_1.getNormalizedController);
// // Recibe y agrega un mensaje, y lo devuelve con su id asignado
// // Endpoint: /api/mensajes/ Método: POST
router.post('/', auth_1.default, inputValidation_1.inputMsgValidator, messages_controllers_1.saveMsgController);
exports.default = router;
