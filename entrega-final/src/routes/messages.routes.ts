import { Router } from 'express';
import {
  getAllController,
  saveMsgController,
} from '../controllers/messages.controllers';

// Importo middleware para validación de datos para carga y edición de productos
import { inputMsgValidator } from '../middlewares/inputValidation';
import { checkAuth } from '../utils/auth_jwt';

const router = Router();

// Devuelvo todos los mensajes entre un usuario y el chatBot
// Endpoint: /api/mensajes/:username Método: GET
router.get('/:username', checkAuth, getAllController);

// // Recibe y agrega un mensaje, y lo devuelve con su id asignado
// // Endpoint: /api/mensajes/ Método: POST
router.post('/', checkAuth, inputMsgValidator, saveMsgController);

export default router;
