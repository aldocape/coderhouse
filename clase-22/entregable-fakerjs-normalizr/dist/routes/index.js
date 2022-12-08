"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const messages_1 = __importDefault(require("./messages"));
const products_1 = require("../controller/products");
const router = express_1.Router();
router.use('/mensajes', messages_1.default);
router.use('/productos-test', (req, res) => {
    const products = products_1.getWithFaker();
    if (products.success) {
        res.json(products.products);
    }
    else {
        res.status(400).json({
            msg: products.msg,
        });
    }
});
exports.default = router;
