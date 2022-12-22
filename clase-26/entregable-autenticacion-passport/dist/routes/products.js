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
const products_1 = __importDefault(require("../controller/products"));
// Importo middleware de autenticación de usuario autorizado
const auth_1 = __importDefault(require("../middlewares/auth"));
// Importo middleware para validación de datos para carga y edición de productos
const inputValidation_1 = require("../middlewares/inputValidation");
// Importo función para saber si se ingresa un ObjectId válido
const tools_1 = require("../utils/tools");
const router = (0, express_1.Router)();
// Recibe y agrega un producto, y lo devuelve con su id asignado
// Endpoint: /api/productos Método: POST
router.post('/', auth_1.default, inputValidation_1.middlewareValidatorInsert, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nombre, descripcion, codigo, foto, precio, stock } = req.productData;
        const newProduct = {
            nombre,
            descripcion,
            codigo,
            foto,
            precio,
            stock,
        };
        const newProd = yield products_1.default.add(newProduct);
        res.status(201).json({
            msg: 'Producto creado con éxito',
            newProd,
        });
    }
    catch (err) {
        res.status(500).json({
            error: err.message,
        });
    }
}));
// Recibe un id y actualiza un producto, en caso de existir
// Endpoint: /api/productos/:id Método: PUT
router.put('/:id', auth_1.default, inputValidation_1.middlewareValidatorUpdate, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if ((0, tools_1.isValidObjectId)(id)) {
            // Mando al controller toda la data válida que llega desde el middleware
            const prod = yield products_1.default.update(id, req.productData);
            res.json(prod);
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
// Devuelvo todos los productos
// Endpoint: /api/productos/:id Método: GET
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Traigo todos los productos y los devuelvo en un json
        const products = yield products_1.default.getAll();
        if (products) {
            res.json(products);
            // res.render('list', { products });
        }
        else {
            res.status(400).json({
                msg: 'Hubo un error al obtener los productos',
            });
        }
    }
    catch (err) {
        res.status(500).json({
            error: err.message,
        });
    }
}));
// Devuelvo un producto según su id
// Endpoint: /api/productos/:id Método: GET
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if ((0, tools_1.isValidObjectId)(id)) {
            const product = yield products_1.default.getById(id);
            if (!product)
                res.status(404).json({
                    msg: 'El producto no ha sido encontrado',
                });
            res.json(product);
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
// // Elimina un producto según su id
// // Endpoint: /api/productos/:id Método: DELETE
router.delete('/:id', auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if ((0, tools_1.isValidObjectId)(id)) {
            const result = yield products_1.default.deleteById(id);
            if (result)
                res.json({
                    msg: `El producto con id "${id}" ha sido eliminado`,
                });
            else
                res.json({
                    msg: 'El producto con el id seleccionado no existe',
                });
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
