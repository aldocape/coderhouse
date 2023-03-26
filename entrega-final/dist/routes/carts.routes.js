"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const carts_controllers_1 = require("../controllers/carts.controllers");
const router = (0, express_1.Router)();
// Función que crea un carrito, y para el caso que reciba también por 'body' un listado de productos con sus cantidades, los agrega a ese carrito
// Endpoint: /api/carrito Método: POST
router.post('/', carts_controllers_1.saveCartController);
// Función para listar todos los productos guardados en el carrito, recibe id de carrito
// Endpoint: /api/carrito/:id/productos Método: GET
router.get('/:id/productos', carts_controllers_1.getCartController);
// Elimina un carrito recibiendo como parámetro su id
// Endpoint: /api/carrito/:id Método: DELETE
router.delete('/:id', carts_controllers_1.deleteCartController);
// Permite incorporar productos al carrito por id de carrito
// Endpoint: /api/carrito/:id/productos Método: POST
router.post('/:id/productos', carts_controllers_1.addProdCartController);
// Elimina un producto del carrito recibiendo como parámetros id de carrito e id del producto
// Endpoint: /api/carrito/:id/productos/:id_prod Método: DELETE
router.delete('/:id/productos/:id_prod', carts_controllers_1.deleteProductCartController);
exports.default = router;
