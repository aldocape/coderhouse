import config from '../config';

import jwt from 'jsonwebtoken';
import { Response, NextFunction } from 'express';
import { getUserById } from '../services/users.services';
import logger from '../middlewares/logger';

export const generateAuthToken = (user: any) => {
  const payload = {
    userId: user._id,
    nombre: user.nombre,
    username: user.username,
    admin: user.admin,
  };

  //get the private key from the config file -> environment variable
  const token = jwt.sign(payload, config.TOKEN_SECRET_KEY, {
    expiresIn: config.TOKEN_KEEP_ALIVE,
  });
  return token;
};

export const checkAuth = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  //get the token from the header if present
  const authHeader = req.headers.authorization;

  if (!authHeader)
    return res.status(401).json({ status: 'error', msg: 'Unauthorized' });
  else
    try {
      const [bearer, jswtoken] = authHeader.split(' ');

      const decode: any = jwt.verify(jswtoken, config.TOKEN_SECRET_KEY);

      // Obtengo todos los datos del usuario
      const user = await getUserById(decode.userId);

      if (!user)
        return res.status(400).json({ status: 'error', msg: 'Unauthorized' });

      req.user = user;
      next();
    } catch (err) {
      logger.error(err);
      return res.status(401).json({ status: 'error', msg: 'Unauthorized' });
    }
};
