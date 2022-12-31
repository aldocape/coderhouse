"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const products_1 = __importDefault(require("./products"));
const carts_1 = __importDefault(require("./carts"));
const messages_1 = __importDefault(require("./messages"));
const random_1 = __importDefault(require("./random"));
const router = (0, express_1.Router)();
router.use('/productos', products_1.default);
router.use('/carrito', carts_1.default);
router.use('/mensajes', messages_1.default);
router.use('/randoms', random_1.default);
exports.default = router;
