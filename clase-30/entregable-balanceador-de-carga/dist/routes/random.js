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
const server_1 = require("../services/server");
const router = (0, express_1.Router)();
const child_process_1 = require("child_process");
const path_1 = __importDefault(require("path"));
const scriptPath = path_1.default.resolve(__dirname, '../utils/tools');
// Función para calcular un cantidad de números aleatorios
// en un rango especificado por parámetros de consulta (query)
// Endpoint: /api/randoms Método: GET
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Verifico si cant llegó por query params
        const { cant } = req.query;
        let canti;
        cant ? (canti = parseInt(cant)) : (canti = 100000000);
        const computo = (0, child_process_1.fork)(scriptPath);
        computo.send(canti);
        computo.on('message', (result) => {
            res.json({
                msg: `Hola desde el puerto ${server_1.PORT}`,
                resultado: result,
            });
        });
    }
    catch (err) {
        res.status(500).json({
            error: err.message,
        });
    }
}));
exports.default = router;
