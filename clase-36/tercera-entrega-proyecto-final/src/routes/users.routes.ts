// Importo cookie parser para almacaner cookie de sesión en el browser del cliente
import cookieParser from 'cookie-parser';

// Importo express session y connect-mongo para almacenar las sesiones en Mongo Atlas
import session from 'express-session';
import MongoStore from 'connect-mongo';

// Importo passport para uso de passport local para gestión de datos de usuario en la sesión
import passport from 'passport';

import { Router, Request, Response, NextFunction } from 'express';
import logger from '../middlewares/logger';

// Uso librería connect-flash para poder mostrar en el front los mensajes que manda el callback de passport.authenticate
import flash from 'connect-flash';

// Importo middleware de autenticación de usuario autorizado
import auth from '../middlewares/auth';

// Importo función middleware que verifica que el usuario esté logueado
import { isLoggedIn } from '../middlewares/user';

import config from '../config';

import {
  loginFunction,
  signUpFunction,
  logout,
  sendMail,
  updateUserController,
  getAllUsersController,
} from '../controllers/users.controllers';

const router = Router();

// Cantidad de segundos en los que expira la sesión
const ttlSeconds = 600; // 600 seg = 10 minutos

const mongoUrl: string = config.MONGO_ATLAS_URL;

// Parámetros de almacenamiento de la sesión en Mongo Atlas

// Pongo resave:true porque sino da un error
// Error: Unable to find the session to touch
const storeOptions = {
  store: MongoStore.create({
    mongoUrl,
    crypto: {
      secret: 'abejita',
    },
  }),
  secret: 'MiClaveSuperSecreta',
  resave: true,
  saveUninitialized: false,
  cookie: {
    maxAge: ttlSeconds * 1000,
  },
};

const passportOptions: any = {
  badRequestMessage: 'Falta username o password',
  failureRedirect: '/login',
  failureFlash: true,
};

router.use(cookieParser());

router.use(session(storeOptions));

router.use(passport.initialize());
router.use(passport.session());

passport.use('login', loginFunction);
passport.use('signup', signUpFunction);

router.use(flash());

// La ruta '/home' sólo es accesible si el usuario está logueado, mediante el uso de middleware 'isLoggedIn'
// Debe ir necesariamente en el router de usuario porque 'isLoggedIn' necesita verificar
// con la función 'isAuthenticated()' que depende de passport que está implementado en esta sección
router.get('/home', isLoggedIn, (req: any, res: Response) => {
  if (req.user && req.user.username) {
    const { nombre, username, direccion, avatar, id, carrito } = req.user;
    res.render('index', {
      nombre,
      username,
      direccion,
      avatar,
      user_id: id,
      carrito_id: carrito,
    });
  }
});

// Login del usuario - Verifico usuario válido
// Endpoint: /login Método: POST
router.post(
  '/login',
  passport.authenticate('login', passportOptions),
  (req: any, res: Response) => {
    try {
      if (req.user) {
        res.redirect('/home');
      } else {
        res.render('login', { msg: 'Error al ingresar' });
      }
    } catch (err) {
      console.log(err);
    }
  }
);

// Carga de nuevo usuario y envío de mail al administrador
// Endpoint: /signup Método: POST
router.post('/signup', (req: Request, res: Response, next: NextFunction) => {
  try {
    passport.authenticate(
      'signup',
      passportOptions,
      async (err, user, info) => {
        if (err) {
          return next(err);
        }
        if (!user) {
          return res.status(401).json(info);
        }

        // envio de mail
        await sendMail(req);

        res.render('login', {
          msg: 'Usuario creado con éxito - Ya puede ingresar al sitio con sus datos de acceso',
        });
      }
    )(req, res, next);
  } catch (err) {
    console.log(err);
  }
});

// Recibe un id y actualiza un usuario, en caso de existir
// Endpoint: /api/usuarios/:id Método: PUT
router.put('/api/usuarios/:id', auth, updateUserController);

// Devuelvo todos los usuarios
// Endpoint: /api/usuarios/ Método: GET
router.get('/api/usuarios', auth, getAllUsersController);

// Muestra formulario de login, y un mensaje en caso de corresponder
// Endpoint: /login Método: GET
router.get('/login', (req: Request, res: Response) => {
  logger.info(`Process PID: '${process.pid}'`);
  res.render('login', { msg: req.flash('signUpMessage') });
});

// Logout del usuario
// Endpoint: /logout Método: GET
router.get('/logout', logout);

// Nuevo registro de usuario
// Endpoint: /register Método: GET
router.get('/register', (req: Request, res: Response) => {
  res.render('register', { msg: '' });
});

export default router;
