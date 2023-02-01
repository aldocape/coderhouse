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
const tools_1 = require("../utils/tools");
const messages_1 = __importDefault(require("../controller/messages"));
const inputValidation_1 = require("../middlewares/inputValidation");
const router = (0, express_1.Router)();
// Recibe y agrega un mensaje, y lo devuelve con su id asignado
// Endpoint: /api/mensajes Método: POST
router.post('/', inputValidation_1.inputMsgValidator, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { author, text } = req.msgData;
        const msg = (0, tools_1.formatMessage)(author, text);
        const newMsg = yield messages_1.default.add(msg);
        if (newMsg) {
            res.status(201).json({
                msg: 'Mensaje creado con éxito',
                newMsg,
            });
        }
    }
    catch (error) {
        res.status(400).json({
            msg: 'Hubo un error al publicar el mensaje',
        });
    }
}));
// Devuelvo todos los mensajes
// Endpoint: /api/mensajes/ Método: GET
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Traigo todos los mensajes y los devuelvo en un json
        const messages = yield messages_1.default.getAll();
        res.json(messages);
    }
    catch (error) {
        res.status(400).json({
            msg: 'Hubo un error al obtener los mensajes',
        });
    }
}));
router.get('/normalized', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Traigo todos los mensajes y los devuelvo en un json
        const messages = yield messages_1.default.getAllNormalized();
        res.json(messages);
    }
    catch (error) {
        res.status(400).json({
            msg: 'Hubo un error al obtener los mensajes normalizados',
        });
    }
}));
router.get('/desnormalized', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Traigo todos los mensajes y los devuelvo en un json
        const messages = yield messages_1.default.getAllDenormalized();
        res.json(messages);
    }
    catch (error) {
        res.status(400).json({
            msg: 'Hubo un error al obtener los mensajes desnormalizados',
        });
    }
}));
exports.default = router;
