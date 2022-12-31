// Importo cookie parser para almacaner cookie de sesión en el browser del cliente
import cookieParser from 'cookie-parser';
// Importo express session y connect-mongo para almacenar las sesiones en Mongo Atlas
import session from 'express-session';
import MongoStore from 'connect-mongo';

import { loginFunction, signUpFunction } from '../services/auth';
import passport from 'passport';

import { Router, Request, Response, NextFunction } from 'express';
import { isLoggedIn } from '../middlewares/user';

// Uso librería connect-flash para poder mostrar en el front los mensajes que manda el callback de passport.authenticate
import flash from 'connect-flash';

import config from '../config';

const loginRouter = Router();

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

loginRouter.use(cookieParser());

loginRouter.use(session(storeOptions));

loginRouter.use(passport.initialize());
loginRouter.use(passport.session());

passport.use('login', loginFunction);
passport.use('signup', signUpFunction);

loginRouter.use(flash());

loginRouter.get('/home', isLoggedIn, (req: any, res) => {
  if (req.user && req.user.username)
    res.render('index', { nombre: req.user.username });
});

// La ruta raíz redirecciona a /home para poder hacer la verificación de usuario logueado
loginRouter.get('/', (req, res) => {
  res.redirect('/home');
});

loginRouter.post(
  '/login',
  passport.authenticate('login', passportOptions),
  (req, res) => {
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

loginRouter.post('/signup', (req, res, next) => {
  try {
    passport.authenticate('signup', passportOptions, (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(401).json(info);
      }
      res.render('login', { msg: 'Usuario creado con éxito' });
      // res.json({
      //   msg: 'SignUp OK',
      // });
    })(req, res, next);
  } catch (err) {
    console.log(err);
  }
});

loginRouter.get('/login', (req, res) => {
  console.log(process.pid);
  res.render('login', { msg: req.flash('signUpMessage') });
});

loginRouter.get('/logout', (req: any, res, next) => {
  if (req.user && req.user.username) {
    try {
      const username = req.user.username;
      req.logout(function (err: any) {
        if (err) {
          return next(err);
        }

        if (username) {
          res.render('logout', { username });
        } else {
          res.json({
            status: 'Error en el logout',
            body: err,
          });
        }
      });
    } catch (err) {
      res.json({
        status: 'Error en el logout',
        body: err,
      });
    }
  } else {
    res.render('login', { msg: '' });
  }
});

loginRouter.get('/register', (req, res) => {
  res.render('register', { msg: '' });
});

export default loginRouter;
