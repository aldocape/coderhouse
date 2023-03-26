import { Response, NextFunction } from 'express';
import logger from './logger';

// Middleware que verifica si el usuario logueado es o no un admin
const authenticate = (req: any, res: Response, next: NextFunction): void => {
  if (req.user.admin) next();
  else {
    logger.error(`ruta '${req.baseUrl}' método '${req.method}' no autorizada`);
    res.status(401).json({
      status: 'error',
      msg: 'Usuario no autorizado para la operación que intenta realizar',
    });
  }
};

export default authenticate;
