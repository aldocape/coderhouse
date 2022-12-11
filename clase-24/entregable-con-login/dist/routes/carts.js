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
const carts_1 = __importDefault(require("../controller/carts"));
const products_1 = __importDefault(require("../controller/products"));
const router = (0, express_1.Router)();
const tools_1 = require("../utils/tools");
// Función que crea un carrito, y para el caso que reciba también por 'body' el id de un producto, lo agrega a ese carrito
// Endpoint: /api/carrito Método: POST
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { prodId } = req.body;
    try {
        let productos = [];
        // Verifico si tengo un prodId que viene por body, creo un array con ese elemento, sino el array queda vacío
        if (prodId) {
            productos = [new tools_1.ObjectId(prodId)];
        }
        const cart = {
            productos,
        };
        const newCart = yield carts_1.default.add(cart);
        if (newCart) {
            res.status(201).json({
                msg: 'Carrito creado con éxito',
                newCart,
            });
        }
        else {
            res.json({
                msg: 'Hubo un error al cargar el carrito',
                newCart,
            });
        }
    }
    catch (err) {
        res.status(500).json({
            error: err.message,
        });
    }
}));
// Endpoint para listar todos los productos guardados en el carrito, recibe id de carrito
// Endpoint: /api/carrito/:id/productos Método: GET
router.get('/:id/productos', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        // Verifico que el objectId sea correcto
        if ((0, tools_1.isValidObjectId)(id)) {
            const cart = yield carts_1.default.getById(id);
            if (cart) {
                res.json(cart);
            }
            else
                res.status(401).json({
                    msg: 'No se ha encontrado un carrito con el id enviado',
                });
        }
        else {
            res.json({
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
// Elimina un carrito recibiendo como parámetro su id
// Endpoint: /api/carrito/:id Método: DELETE
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield carts_1.default.delete(req.params.id);
        if (result)
            res.json({
                msg: `El carrito con id "${req.params.id}" ha sido eliminado`,
            });
        else
            res.json(result);
    }
    catch (err) {
        res.status(500).json({
            error: err.message,
        });
    }
}));
// Permite incorporar productos al carrito por id de producto
// Endpoint: /api/carrito/:id/productos Método: POST
router.post('/:id/productos', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { prodId } = req.body;
    try {
        // Busco el producto en la DB
        const product = yield products_1.default.getById(prodId);
        if (!product) {
            res.status(400).json({
                msg: `No existe el producto con id: ${prodId}`,
            });
        }
        else {
            // Busco el carrito en la DB
            const productsCart = yield carts_1.default.getById(req.params.id);
            if (!productsCart) {
                res.status(400).json({
                    msg: `No existe el carrito con id: ${req.params.id}`,
                });
            }
            else {
                const idProd = new tools_1.ObjectId(prodId);
                // Si existe el carrito y el producto, agrego el producto al array de productos del carrito
                // Verifico también que existe la propiedad 'productos' en el objeto que recibo
                if (productsCart.productos) {
                    // Creo una variable auxiliar 'array' para poder 'pushear'
                    // porque si lo hago directamente con la propiedad 'productos', TypeScript marca un error
                    const array = productsCart.productos;
                    array.push(idProd);
                    const carrito = {
                        productos: array,
                    };
                    // Actualizo con el nuevo carrito en la base de datos
                    const updatedCart = yield carts_1.default.update(req.params.id, carrito);
                    res.json(updatedCart);
                }
                else {
                    res.status(400).json({
                        msg: 'Hubo un error al intentar actualizar el carrito',
                    });
                }
            }
        }
    }
    catch (err) {
        res.status(500).json({
            error: err.message,
        });
    }
}));
// Elimina un producto del carrito recibiendo como parámetros id de carrito e id del producto
// Endpoint: /api/carrito/:id/productos/:id_prod Método: DELETE
router.delete('/:id/productos/:id_prod', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //Obtengo el carrito desde la DB
        const productsCart = yield carts_1.default.getById(req.params.id);
        // Si el carrito no existe en la DB, mando un error
        if (!productsCart) {
            res.status(400).json({
                msg: 'No existe ningún carrito con el id proporcionado',
            });
        }
        else {
            // Si el carrito existe, busco el producto
            // const id = new ObjectId(req.params.id_prod);
            const index = productsCart.productos.findIndex((prod) => prod.id == req.params.id_prod);
            // Si index = -1, el producto con ese id no existe, devuelvo un error
            if (index < 0) {
                res.status(400).json({
                    msg: 'El id de producto seleccionado no existe en el carrito',
                });
            }
            else {
                // Si el producto buscado existe, lo elimino en el array de productos con el método 'splice'
                // Creo una variable auxiliar 'array' para poder eliminar
                // porque si lo hago directamente con la propiedad 'productos', TypeScript marca un error
                const array = productsCart.productos;
                array.splice(index, 1);
                const carrito = {
                    productos: array,
                };
                // Actualizo el carrito en la BD
                const updatedCart = yield carts_1.default.update(req.params.id, carrito);
                // Si salió todo bien muestro carrito actualizado, sino muestro un error
                if (updatedCart) {
                    res.json(updatedCart);
                }
                else {
                    res.status(400).json({
                        msg: 'Hubo un error al intentar actualizar el carrito',
                    });
                }
            }
        }
    }
    catch (err) {
        res.status(500).json({
            error: err.message,
        });
    }
}));
exports.default = router;
