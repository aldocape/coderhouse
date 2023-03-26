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
exports.updateProdController = exports.deleteProdByIdController = exports.getProdByIdController = exports.getAllController = exports.saveController = void 0;
const products_services_1 = require("../services/products.services");
const saveController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const newProd = yield (0, products_services_1.saveProduct)(newProduct);
        res.status(201).json({
            msg: 'Producto creado con éxito',
            newProd,
        });
    }
    catch (err) {
        res.status(400).json({
            error: err.message,
        });
    }
});
exports.saveController = saveController;
const getAllController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield (0, products_services_1.getAllProducts)();
        if (products) {
            res.json(products);
        }
        else {
            res.status(400).json({
                msg: 'Hubo un error al obtener los productos',
            });
        }
    }
    catch (err) {
        res.status(400).json({
            error: err.message,
        });
    }
});
exports.getAllController = getAllController;
const getProdByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const product = yield (0, products_services_1.getProductById)(id);
        if (product)
            res.json(product);
        else
            res.status(404).json({
                msg: 'El producto no ha sido encontrado',
            });
    }
    catch (err) {
        res.status(400).json({
            error: err.message,
        });
    }
});
exports.getProdByIdController = getProdByIdController;
const deleteProdByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield (0, products_services_1.deleteProductById)(id);
        if (result)
            res.json({
                msg: `El producto con id "${id}" ha sido eliminado`,
            });
        else
            res.json({
                msg: 'El producto con el id seleccionado no existe',
            });
    }
    catch (err) {
        res.status(400).json({
            error: err.message,
        });
    }
});
exports.deleteProdByIdController = deleteProdByIdController;
const updateProdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        // Mando a la función toda la data válida que llega desde el middleware
        const prod = yield (0, products_services_1.updateProduct)(id, req.productData);
        res.json(prod);
    }
    catch (err) {
        res.status(400).json({
            error: err.message,
        });
    }
});
exports.updateProdController = updateProdController;
