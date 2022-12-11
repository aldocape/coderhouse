import { Router, Request, Response } from 'express';
import { formatMessage } from '../utils/tools';
import { Mensaje } from '../interfaces';
import msgInstance from '../controller/messages';
import { inputMsgValidator } from '../middlewares/inputValidation';

const router = Router();

// Recibe y agrega un mensaje, y lo devuelve con su id asignado
// Endpoint: /api/mensajes Método: POST
router.post('/', inputMsgValidator, async (req: any, res: Response) => {
  const { author, text } = req.msgData;
  const msg: Mensaje = formatMessage(author, text);

  const newMsg = await msgInstance.add(msg);

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
  const messages = await msgInstance.getAll();

  if (messages) {
    res.json(messages);
  } else {
    res.status(400).json({
      msg: messages,
    });
  }
});

router.get('/normalized', async (req: Request, res: Response) => {
  // Traigo todos los mensajes y los devuelvo en un json
  // const messages = await getAllNormalized();
  // if (messages.success) {
  //   res.json(messages);
  // } else {
  //   res.status(400).json({
  //     msg: messages.msg,
  //   });
  // }
});

router.get('/desnormalized', async (req: Request, res: Response) => {
  // Traigo todos los mensajes y los devuelvo en un json
  // const messages = await desnormalized();
  // if (messages.success) {
  //   res.json(messages);
  // } else {
  //   res.status(400).json({
  //     msg: messages.msg,
  //   });
  // }
});

export default router;
