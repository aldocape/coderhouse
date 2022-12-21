// Importo cookie parser para almacaner cookie de sesión en el browser del cliente
import cookieParser from 'cookie-parser';
// Importo express session y connect-mongo para almacenar las sesiones en Mongo Atlas
import session from 'express-session';
import MongoStore from 'connect-mongo';

import { loginFunction, signUpFunction } from '../services/auth';
import passport from 'passport';

import { Router, Request, Response, NextFunction } from 'express';
import { isLoggedIn } from '../middlewares/user';

import config from '../config';

const loginRouter = Router();

// Cantidad de segundos en los que expira la sesión
const ttlSeconds = 600; // 600 seg = 10 minutos

const mongoUrl: string = config.MONGO_ATLAS_URL;

// Parámetros de almacenamiento de la sesión en Mongo Atlas
const storeOptions = {
  store: MongoStore.create({
    mongoUrl,
    crypto: {
      secret: 'abejita',
    },
  }),
  secret: 'MiClaveSuperSecreta',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: ttlSeconds * 1000,
  },
};

const passportOptions: any = { badRequestMessage: 'Falta username o password' };

loginRouter.use(cookieParser());

loginRouter.use(session(storeOptions));

loginRouter.use(passport.initialize());
loginRouter.use(passport.session());

passport.use('login', loginFunction);
passport.use('signup', signUpFunction);

// declare module 'express-session' {
//   interface SessionData {
//     info: {
//       loggedIn: boolean;
//       username: string;
//     };
//   }
// }

// const validateLogin = (req: Request, res: Response, next: NextFunction) => {
//   // Si el usuario se encuentra logueado, deja que continúe, sino redirecciona a '/login'
//   if (req.session.info && req.session.info.loggedIn) next();
//   else res.redirect('/login');
// };

// El endpoint '/home' verifica que haya un usuario logueado
// por medio del middleware 'validateLogin', y en ese caso manda su 'username' como parámetro
// para que se muestre en la plantilla 'index'

// loginRouter.get('/home', validateLogin, (req: Request, res: Response) => {
//   res.render('index', { nombre: req.session.info?.username });
// });

loginRouter.get('/home', isLoggedIn, (req: any, res) => {
  if (req.user && req.user.username)
    res.render('index', { nombre: req.user.username });
});

// La ruta raíz redirecciona a /home para poder hacer la verificación de usuario logueado
loginRouter.get('/', (req, res) => {
  res.redirect('/home');
});

// router.post('/login', passport.authenticate('login', passportOptions), login);

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

// loginRouter.post('/login', (req, res) => {
//   const { username, password } = req.body;

//   const index = users.findIndex(
//     (usuario) => usuario.username === username && usuario.password === password
//   );

//   if (index < 0) {
//     res.render('login', { msg: 'Usuario no autorizado' });
//   } else {
//     // Si encuentra al usuario en la base de datos, guarda el username en la info de sesión
//     const user = users[index];
//     req.session.info = {
//       loggedIn: true,
//       username: user.username,
//     };
//     // Redirecciono a '/home' con la sesión iniciada
//     res.redirect('/home');
//   }
// });

loginRouter.get('/login', (req, res) => {
  res.render('login', { msg: '' });
});

loginRouter.get('/logout', (req: any, res, next) => {
  const username = req.user.username;
  req.logout(function (err: any) {
    if (err) {
      return next(err);
    }
    req.session.destroy((err: any) => {
      console.log(`error: ${err}`);
      if (!err) {
        res.render('logout', { username });
      } else {
        res.json({
          status: 'Error en el logout',
          body: err,
        });
      }
    });
  });
});

loginRouter.get('/register', (req, res) => {
  res.render('register', { msg: '' });
});

export default loginRouter;
