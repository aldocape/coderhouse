"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_1 = __importDefault(require("../controller/users"));
// Importo middleware de autenticación de usuario autorizado
const auth_1 = __importDefault(require("../middlewares/auth"));
// Importo función para saber si se ingresa un ObjectId válido
const tools_1 = require("../utils/tools");
const router = (0, express_1.Router)();
// Recibe un id y actualiza un usuario, en caso de existir
// Endpoint: /api/usuarios/:id Método: PUT
router.put('/:id', auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if ((0, tools_1.isValidObjectId)(id)) {
            // Mando al controller toda la data válida que llega desde el middleware
            const user = yield users_1.default.update(id, req.body);
            res.json(user);
        }
        else {
            res.status(500).json({
                msg: 'El id proporcionado no es un ObjectId válido para MongoDB',
            });
        }
    }
    catch (err) {
        res.status(500).json({
            error: err.message,
        });
    }
}));
exports.default = router;
