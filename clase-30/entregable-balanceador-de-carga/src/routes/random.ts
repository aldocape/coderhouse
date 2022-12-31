import { Router, Request, Response } from 'express';
import { PORT } from '../services/server';

const router = Router();

import { fork } from 'child_process';
import path from 'path';

const scriptPath = path.resolve(__dirname, '../utils/tools');

// Función para calcular un cantidad de números aleatorios
// en un rango especificado por parámetros de consulta (query)

// Endpoint: /api/randoms Método: GET

router.get('/', async (req: Request, res: Response) => {
  try {
    // Verifico si cant llegó por query params
    const { cant }: any = req.query;

    let canti: number;
    cant ? (canti = parseInt(cant)) : (canti = 100000000);

    const computo = fork(scriptPath);
    computo.send(canti);

    computo.on('message', (result) => {
      res.json({
        msg: `Hola desde el puerto ${PORT}`,
        resultado: result,
      });
    });
  } catch (err: any) {
    res.status(500).json({
      error: err.message,
    });
  }
});

export default router;
