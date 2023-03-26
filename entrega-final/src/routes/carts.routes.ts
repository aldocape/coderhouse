import { Router } from 'express';

import {
  saveCartController,
  getCartController,
  deleteCartController,
  deleteProductCartController,
  addProdCartController,
} from '../controllers/carts.controllers';

// Importo middleware de verificación de usuario logueado
import { checkAuth } from '../utils/auth_jwt';

const router = Router();

// Función que crea un carrito, y para el caso que reciba también por 'body' un listado de productos con sus cantidades, los agrega a ese carrito
// Endpoint: /api/carrito Método: POST

// En este caso no verificamos usuario logueado porque el único momento en que se crea un carrito
// es cuando se registra un usuario nuevo, dentro del método 'signup'
// De esta manera, nos aseguramos de que se crean ambos al mismo tiempo
router.post('/', checkAuth, saveCartController);

// Función para listar todos los productos guardados en el carrito, recibe id de carrito
// Endpoint: /api/carrito/:id/productos Método: GET
router.get('/:id/productos', checkAuth, getCartController);

// Elimina un carrito recibiendo como parámetro su id
// Endpoint: /api/carrito/:id Método: DELETE
router.delete('/:id', checkAuth, deleteCartController);

// Permite incorporar productos al carrito por id de carrito
// Endpoint: /api/carrito/:id/productos Método: POST
router.post('/:id/productos', checkAuth, addProdCartController);

// Elimina un producto del carrito recibiendo como parámetros id de carrito e id del producto
// Endpoint: /api/carrito/:id/productos/:id_prod Método: DELETE
router.delete(
  '/:id/productos/:id_prod',
  checkAuth,
  deleteProductCartController
);

export default router;
