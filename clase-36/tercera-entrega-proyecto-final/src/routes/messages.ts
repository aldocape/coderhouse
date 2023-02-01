import { Router, Request, Response } from 'express';
import { formatMessage } from '../utils/tools';
import { Mensaje } from '../interfaces';
import msgInstance from '../controller/messages';
import { inputMsgValidator } from '../middlewares/inputValidation';

const router = Router();

// Recibe y agrega un mensaje, y lo devuelve con su id asignado
// Endpoint: /api/mensajes Método: POST
router.post('/', inputMsgValidator, async (req: any, res: Response) => {
  try {
    const { author, text } = req.msgData;
    const msg: Mensaje = formatMessage(author, text);

    const newMsg = await msgInstance.add(msg);

    if (newMsg) {
      res.status(201).json({
        msg: 'Mensaje creado con éxito',
        newMsg,
      });
    }
  } catch (error: any) {
    res.status(400).json({
      msg: 'Hubo un error al publicar el mensaje',
    });
  }
});

// Devuelvo todos los mensajes
// Endpoint: /api/mensajes/ Método: GET
router.get('/', async (req, res) => {
  try {
    // Traigo todos los mensajes y los devuelvo en un json
    const messages = await msgInstance.getAll();

    res.json(messages);
  } catch (error: any) {
    res.status(400).json({
      msg: 'Hubo un error al obtener los mensajes',
    });
  }
});

router.get('/normalized', async (req: Request, res: Response) => {
  try {
    // Traigo todos los mensajes y los devuelvo en un json
    const messages = await msgInstance.getAllNormalized();

    res.json(messages);
  } catch (error: any) {
    res.status(400).json({
      msg: 'Hubo un error al obtener los mensajes normalizados',
    });
  }
});

router.get('/desnormalized', async (req: Request, res: Response) => {
  try {
    // Traigo todos los mensajes y los devuelvo en un json
    const messages = await msgInstance.getAllDenormalized();
    res.json(messages);
  } catch (error: any) {
    res.status(400).json({
      msg: 'Hubo un error al obtener los mensajes desnormalizados',
    });
  }
});

export default router;
