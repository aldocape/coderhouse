import { Router, Request, Response, NextFunction } from 'express';

import {
  loginController,
  signUpController,
  logout,
  getSession,
} from '../controllers/users.controllers';

import { inputUsrValidator } from '../middlewares/inputValidation';
import { getAllUsers } from '../services/users.services';

// Importo middlewares de autenticación de usuario autorizado
import adminAuth from '../middlewares/auth'; // Verifica si el usuario es admin
import { checkAuth } from '../utils/auth_jwt'; // Verifica que exista un usuario logueado

const router = Router();

// Logout del usuario
// Endpoint: /logout Método: GET
router.get('/logout/:user_id', logout);

// Nuevo registro de usuario
// Endpoint: /register Método: GET
router.get('/register', (req: Request, res: Response) => {
  res.render('register', { msg: '' });
});

// El router de obtener todos los usuarios lo implemento de esta manera
// porque no me permite importar el controlador, me da un error de Typescript
router.get(
  '/api/usuarios',
  checkAuth,
  adminAuth,
  async (req: Request, res: Response) => {
    try {
      const users = await getAllUsers();

      if (users) {
        res.json(users);
      } else {
        res.status(400).json({
          msg: 'Hubo un error al obtener los usuarios',
        });
      }
    } catch (err: any) {
      res.status(400).json({
        error: err.message,
      });
    }
  }
);

router.post('/signup', inputUsrValidator, signUpController);
router.post('/login', loginController);
router.get('/usuarios/session', checkAuth, getSession);

export default router;
