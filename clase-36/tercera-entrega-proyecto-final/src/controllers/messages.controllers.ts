import {
  saveMessage,
  getAllMessages,
  getAllNormalized,
} from '../services/messages.services';

import { Request, Response } from 'express';

// Importo estructura de datos para mensajes
import { Mensaje } from '../interfaces';
// Importo función para agregar fecha y hora a los mensajes
import { formatMessage } from '../utils/tools';

// Obtiene todos los mensajes
export const getAllController = async (req: Request, res: Response) => {
  try {
    const messages = await getAllMessages();

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

// Obtiene mensajes normalizados
export const getNormalizedController = async (req: Request, res: Response) => {
  try {
    const messages = await getAllNormalized();

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
    const { author, text } = req.msgData;
    const msg: Mensaje = formatMessage(author, text);

    const newMsg = await saveMessage(msg);

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
};
