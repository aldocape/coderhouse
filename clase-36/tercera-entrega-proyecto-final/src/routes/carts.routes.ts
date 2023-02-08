import { Router } from 'express';

import {
  saveCartController,
  getCartController,
  deleteCartController,
  deleteProductCartController,
  addProdCartController,
} from '../controllers/carts.controllers';

const router = Router();

// Función que crea un carrito, y para el caso que reciba también por 'body' un listado de productos con sus cantidades, los agrega a ese carrito
// Endpoint: /api/carrito Método: POST
router.post('/', saveCartController);

// Función para listar todos los productos guardados en el carrito, recibe id de carrito
// Endpoint: /api/carrito/:id/productos Método: GET
router.get('/:id/productos', getCartController);

// Elimina un carrito recibiendo como parámetro su id
// Endpoint: /api/carrito/:id Método: DELETE
router.delete('/:id', deleteCartController);

// Permite incorporar productos al carrito por id de producto
// Endpoint: /api/carrito/:id/productos Método: POST
router.post('/:id/productos', addProdCartController);

// Elimina un producto del carrito recibiendo como parámetros id de carrito e id del producto
// Endpoint: /api/carrito/:id/productos/:id_prod Método: DELETE
router.delete('/:id/productos/:id_prod', deleteProductCartController);

export default router;
