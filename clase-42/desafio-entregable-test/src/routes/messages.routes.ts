import { Router } from 'express';
import {
  getAllController,
  getNormalizedController,
  saveMsgController,
} from '../controllers/messages.controllers';

// Importo middleware de autenticación de usuario autorizado
import auth from '../middlewares/auth';

// Importo middleware para validación de datos para carga y edición de productos
import { inputMsgValidator } from '../middlewares/inputValidation';

const router = Router();

// Devuelvo todos los mensajes
// Endpoint: /api/mensajes/ Método: GET
router.get('/', getAllController);

// Devuelvo todos los mensajes normalizados
// Endpoint: /api/mensajes/normalized/ Método: GET
router.get('/normalized', getNormalizedController);

// // Recibe y agrega un mensaje, y lo devuelve con su id asignado
// // Endpoint: /api/mensajes/ Método: POST
router.post('/', auth, inputMsgValidator, saveMsgController);

export default router;
