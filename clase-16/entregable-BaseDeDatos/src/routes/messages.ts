import { Router, Response } from 'express';
import { Mensaje } from '../interfaces';
import { formatMessage } from '../utils/messages';
import { add, getAll } from '../controller/messages';
import { inputMsgValidator } from '../middlewares/inputValidation';

const router = Router();

// Recibe y agrega un mensaje, y lo devuelve con su id asignado
// Endpoint: /api/mensajes Método: POST
router.post('/', inputMsgValidator, async (req: any, res: Response) => {
  const { user, text } = req.msgData;
  const msg: Mensaje = formatMessage(user, text);

  const newMsg = await add(msg);

  if (newMsg) {
    res.status(201).json({
      msg: 'Mensaje creado con éxito',
      newMsg,
    });
  } else {
    res.status(400).json({
      msg: 'Hubo un error al cargar el mensaje',
      newMsg: {
        success: false,
      },
    });
  }
});

// Devuelvo todos los mensajes
// Endpoint: /api/mensajes/ Método: GET
router.get('/', async (req, res) => {
  // Traigo todos los mensajes y los devuelvo en un json
  const messages = await getAll();

  if (messages.success) {
    res.json(messages.messages);
  } else {
    res.status(400).json({
      msg: messages.msg,
    });
  }
});

export default router;
