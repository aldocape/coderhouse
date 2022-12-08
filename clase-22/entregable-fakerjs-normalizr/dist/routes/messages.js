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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const messages_1 = require("../controller/messages");
const router = express_1.Router();
// Devuelvo todos los mensajes
// Endpoint: /api/mensajes/ Método: GET
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Traigo todos los mensajes y los devuelvo en un json
    const messages = yield messages_1.getAll();
    if (messages.success) {
        res.json(messages);
    }
    else {
        res.status(400).json({
            msg: messages.msg,
        });
    }
}));
router.get('/normalized', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Traigo todos los mensajes y los devuelvo en un json
    const messages = yield messages_1.getAllNormalized();
    if (messages.success) {
        res.json(messages);
    }
    else {
        res.status(400).json({
            msg: messages.msg,
        });
    }
}));
router.get('/desnormalized', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Traigo todos los mensajes y los devuelvo en un json
    const messages = yield messages_1.desnormalized();
    if (messages.success) {
        res.json(messages);
    }
    else {
        res.status(400).json({
            msg: messages.msg,
        });
    }
}));
exports.default = router;
