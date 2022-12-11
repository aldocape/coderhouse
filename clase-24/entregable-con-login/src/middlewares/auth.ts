import { Request, Response, NextFunction } from 'express';

// Modificar esta variable por la info de sesión cuando esté implementado
const isAdmin = true;

// Middleware de autenticación de usuario (si es o no un Administrador)
const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (isAdmin) next();
  else {
    res.status(401).json({
      error: -1,
      descripcion: `ruta '${req.baseUrl}' método '${req.method}' no autorizada`,
    });
  }
};

export default authenticate;
