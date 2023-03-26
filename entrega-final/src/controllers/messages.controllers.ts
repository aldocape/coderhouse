import { saveMessage, getAllMessages } from '../services/messages.services';

import { Request, Response } from 'express';

// Importo función para agregar fecha y hora a los mensajes
import { formatMessage } from '../utils/tools';

// Obtiene todos los mensajes
export const getAllController = async (req: Request, res: Response) => {
  try {
    const { username } = req.params;
    const messages = await getAllMessages({ username });

    if (messages) {
      res.json(messages);
    } else {
      res.status(400).json({
        msg: 'Hubo un error al obtener los mensajes',
      });
    }
  } catch (err: any) {
    res.status(500).json({
      error: err.message,
    });
  }
};

// Guarda un mensaje nuevo
export const saveMsgController = async (req: any, res: Response) => {
  try {
    const { usuario, mensaje } = req.msgData;

    const msg: any = formatMessage(usuario, mensaje);

    const newMsg = await saveMessage(msg);

    if (newMsg) {
      res.status(201).json({
        status: 'ok',
        newMsg,
      });
    }
  } catch (error: any) {
    res.status(400).json({
      status: 'error',
      msg: 'Hubo un error al publicar el mensaje',
    });
  }
};
