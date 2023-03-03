import { Router, Request, Response } from 'express';
import productsRouter from './products.routes';
import cartsRouter from './carts.routes';
import messagesRouter from './messages.routes';
import usersRouter from './users.routes';
import randomsRouter from './random';
// import emailRouter from './email';

const router = Router();

// La ruta raíz redirecciona a /home para poder hacer la verificación de usuario logueado
router.get('/', (req: Request, res: Response) => {
  res.redirect('/home');
});

// En este caso, el router de 'users' no está en el endpoint '/api/usuarios'
// porque abarca también las funciones de login, logout, y register, que funcionan en otros endpoint
router.use('/', usersRouter);

router.use('/api/productos', productsRouter);
router.use('/api/carrito', cartsRouter);
router.use('/api/mensajes', messagesRouter);
router.use('/api/randoms', randomsRouter);
// router.use('/api/', emailRouter);

export default router;
