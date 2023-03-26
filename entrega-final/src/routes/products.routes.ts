import { Router } from 'express';
import {
  saveController,
  getAllController,
  updateProdController,
  getProdByIdController,
  deleteProdByIdController,
} from '../controllers/products.controllers';

// Importo middlewares de autenticación de usuario autorizado
import adminAuth from '../middlewares/auth'; // Verifica si el usuario es admin
import { checkAuth } from '../utils/auth_jwt'; // Verifica que exista un usuario logueado

// Importo middleware de validación de datos para la creación y edición de productos
import {
  middlewareValidatorInsert,
  middlewareValidatorUpdate,
} from '../middlewares/inputValidation';

const router = Router();

// Recibe y agrega un producto, y lo devuelve con su id asignado
// Endpoint: /api/productos    Método: POST
router.post(
  '/',
  checkAuth,
  adminAuth,
  middlewareValidatorInsert,
  saveController
);

// Devuelvo todos los productos
// Endpoint: /api/productos    Método: GET
router.get('/', getAllController);

// Devuelvo un producto según su id
// Endpoint: /api/productos/:id    Método: GET
router.get('/:id', getProdByIdController);

// Recibe un id y actualiza un producto, en caso de existir
// Endpoint: /api/productos/:id    Método: PUT
router.put(
  '/:id',
  checkAuth,
  adminAuth,
  middlewareValidatorUpdate,
  updateProdController
);

// Elimina un producto según su id
// Endpoint: /api/productos/:id    Método: DELETE
router.delete('/:id', checkAuth, adminAuth, deleteProdByIdController);

export default router;
