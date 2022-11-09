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
const moment_1 = __importDefault(require("moment"));
const products_1 = __importDefault(require("../controller/products"));
const auth_1 = __importDefault(require("../middlewares/auth"));
const inputValidation_1 = require("../middlewares/inputValidation");
const router = express_1.Router();
// Recibe y agrega un producto, y lo devuelve con su id asignado
// Endpoint: /api/productos Método: POST
router.post('/', auth_1.default, inputValidation_1.middlewareValidator, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre, descripcion, codigo, foto, precio, stock } = req.productData;
    const newProduct = {
        timestamp: moment_1.default().format('DD/MM/YYYY hh:mm:ss'),
        nombre,
        descripcion,
        codigo,
        foto,
        precio,
        stock,
    };
    const newProd = yield products_1.default.add(newProduct);
    if (newProd.success) {
        res.status(201).json({
            msg: 'Producto creado con éxito',
            newProd,
        });
    }
    else {
        res.json({
            msg: 'Hubo un error al cargar el nuevo producto',
            newProd,
        });
    }
}));
// Recibe un id y actualiza un producto, en caso de existir
// Endpoint: /api/productos/:id Método: PUT
router.put('/:id', auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre, descripcion, codigo, foto, precio, stock } = req.body;
    const modifiedProduct = {
        id: req.params.id,
        timestamp: moment_1.default().format('DD/MM/YYYY hh:mm:ss'),
        nombre,
        descripcion,
        codigo,
        foto,
        precio,
        stock,
    };
    const prod = yield products_1.default.update(modifiedProduct);
    if (prod.success)
        res.json({
            msg: `El producto con id ${req.params.id} fue modificado con éxito`,
            producto: prod.item,
        });
    else {
        res.json(prod);
    }
}));
// Devuelvo todos los productos
// Endpoint: /api/productos/:id Método: GET
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Traigo todos los productos y los devuelvo en un json
    const products = yield products_1.default.getAll();
    if (products.success) {
        res.json(products.item);
    }
    else {
        res.status(400).json({
            msg: products.msg,
        });
    }
}));
// Devuelvo un producto según su id
// Endpoint: /api/productos/:id Método: GET
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield products_1.default.getById(id);
    if (result.success) {
        res.json(result);
    }
    else
        res.status(401).json(result);
}));
// Elimina un producto según su id
// Endpoint: /api/productos/:id Método: DELETE
router.delete('/:id', auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield products_1.default.deleteById(req.params.id);
    if (result.success)
        res.json({
            msg: `El producto con id ${req.params.id} ha sido eliminado`,
        });
    else
        res.json(result);
}));
exports.default = router;
