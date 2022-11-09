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
const router = express_1.Router();
// Recibe un producto por body y crea un carrito, y lo devuelve con su id asignado
// Endpoint: /api/carrito Método: POST
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const { title, price, thumbnail, msg, success } = req;
    const timestamp = new Date();
    // const producto: Producto = {
    //   id: req.body.prodId,
    //   timestamp: req.body.prodTimeStamp,
    //   nombre: req.body.prodNombre,
    //   descripcion: req.body.prodDescripcion,
    //   codigo: req.body.prodCodigo,
    //   foto: req.body.prodFoto,
    //   precio: req.body.prodPrecio,
    //   stock: req.body.prodStock,
    // };
    const cart = {
        timestamp,
        productos: [],
        // productos: [producto],
    };
    const newCart = yield carts_1.default.add(cart);
    if (newCart.success) {
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
}));
// Me permite listar todos los productos guardados en el carrito
// Endpoint: /api/carrito/:id/productos Método: GET
router.get('/:id/productos', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield carts_1.default.getById(id);
    if (result.success) {
        res.json(result.item.productos);
    }
    else
        res.status(401).json(result);
}));
// Elimina un carrito recibiendo como parámetro su id
// Endpoint: /api/carrito/:id Método: DELETE
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield carts_1.default.delete(req.params.id);
    if (result.success)
        res.json({
            msg: `El carrito con id ${req.params.id} ha sido eliminado`,
        });
    else
        res.json(result);
}));
// Permite incorporar productos al carrito por id de producto
// Endpoint: /api/carrito/:id/productos Método: POST
router.post('/:id/productos', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const { title, price, thumbnail, msg, success } = req;
    const productId = req.body.productId;
    // Busco el producto en la DB
    const product = yield products_1.default.getById(productId);
    if (!product.success) {
        res.status(400).json({
            msg: `No existe el producto con id: ${productId}`,
        });
    }
    else {
        // Busco el carrito en la DB
        const productsCart = yield carts_1.default.getById(req.params.id);
        if (!productsCart.success) {
            res.status(400).json({
                msg: `No existe el carrito con id: ${req.params.id}`,
            });
        }
        else {
            // Si existe el carrito y el producto, agrego el producto al array de productos del carrito
            productsCart.item.productos.push(product.item);
            const updatedCart = yield carts_1.default.update(productsCart.item);
            if (updatedCart.success) {
                res.json({
                    success: true,
                    msg: `El producto con id ${productId} ha sido agregado al carrito seleccionado`,
                    carritoActualizado: updatedCart.item,
                });
            }
            else {
                res.status(400).json({
                    msg: 'Hubo un error al intentar actualizar el carrito',
                });
            }
        }
    }
}));
// Elimina un producto del carrito recibiendo como parámetros id de carrito e id del producto
// Endpoint: /api/carrito/:id/productos/:id_prod Método: DELETE
router.delete('/:id/productos/:id_prod', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //Obtengo el carrito desde la DB
    const productsCart = yield carts_1.default.getById(req.params.id);
    // Si el carrito no existe en la DB, mando un error
    if (!productsCart.success) {
        res.status(400).json({
            msg: 'No existe ningún carrito con el id proporcionado',
        });
    }
    else {
        // Si el carrito existe, busco el producto
        const index = productsCart.item.productos.findIndex((prod) => prod.id == req.params.id_prod);
        // Si index = -1, el producto con ese id no existe, devuelvo un error
        if (index < 0) {
            res.status(400).json({
                msg: 'El id de producto seleccionado no existe en el carrito',
            });
        }
        else {
            // Si el producto buscado existe, lo elimino en el array de productos con el método 'splice'
            productsCart.item.productos.splice(index, 1);
            // Actualizo el carrito en la BD
            const updatedCart = yield carts_1.default.update(productsCart.item);
            // Si salió todo bien muestro carrito actualizado, sino muestro un error
            if (updatedCart.success) {
                res.json({
                    success: true,
                    msg: `El producto con id ${req.params.id_prod} ha sido eliminado con éxito del carrito seleccionado`,
                    carritoActualizado: updatedCart.item,
                });
            }
            else {
                res.status(400).json({
                    msg: 'Hubo un error al intentar actualizar el carrito',
                });
            }
        }
    }
}));
exports.default = router;
