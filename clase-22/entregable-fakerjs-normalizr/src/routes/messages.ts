import { Router, Request, Response } from 'express';
import {
  desnormalized,
  getAll,
  getAllNormalized,
} from '../controller/messages';

const router = Router();

// Devuelvo todos los mensajes
// Endpoint: /api/mensajes/ Método: GET
router.get('/', async (req: Request, res: Response) => {
  // Traigo todos los mensajes y los devuelvo en un json
  const messages = await getAll();

  if (messages.success) {
    res.json(messages);
  } else {
    res.status(400).json({
      msg: messages.msg,
    });
  }
});

router.get('/normalized', async (req: Request, res: Response) => {
  // Traigo todos los mensajes y los devuelvo en un json
  const messages = await getAllNormalized();

  if (messages.success) {
    res.json(messages);
  } else {
    res.status(400).json({
      msg: messages.msg,
    });
  }
});

router.get('/desnormalized', async (req: Request, res: Response) => {
  // Traigo todos los mensajes y los devuelvo en un json
  const messages = await desnormalized();

  if (messages.success) {
    res.json(messages);
  } else {
    res.status(400).json({
      msg: messages.msg,
    });
  }
});

export default router;
