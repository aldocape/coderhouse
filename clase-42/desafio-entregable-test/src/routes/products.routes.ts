import { Router } from 'express';
import {
  saveController,
  getAllController,
  updateProdController,
  getProdByIdController,
  deleteProdByIdController,
} from '../controllers/products.controllers';

// Importo middleware de autenticación de usuario autorizado
import auth from '../middlewares/auth';

// Importo middleware para validación de datos para carga y edición de productos
import {
  middlewareValidatorInsert,
  middlewareValidatorUpdate,
} from '../middlewares/inputValidation';

const router = Router();

// Recibe y agrega un producto, y lo devuelve con su id asignado
// Endpoint: /api/productos    Método: POST
router.post('/', auth, middlewareValidatorInsert, saveController);

// Devuelvo todos los productos
// Endpoint: /api/productos    Método: GET
router.get('/', getAllController);

// Devuelvo un producto según su id
// Endpoint: /api/productos/:id    Método: GET
router.get('/:id', getProdByIdController);

// Recibe un id y actualiza un producto, en caso de existir
// Endpoint: /api/productos/:id    Método: PUT
router.put('/:id', auth, middlewareValidatorUpdate, updateProdController);

// Elimina un producto según su id
// Endpoint: /api/productos/:id    Método: DELETE
router.delete('/:id', auth, deleteProdByIdController);

export default router;
