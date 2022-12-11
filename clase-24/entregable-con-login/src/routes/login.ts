// Importo cookie parser para almacaner cookie de sesión en el browser del cliente
import cookieParser from 'cookie-parser';
// Importo express session y connect-mongo para almacenar las sesiones en Mongo Atlas
import session from 'express-session';
import MongoStore from 'connect-mongo';
import { Router, Request, Response, NextFunction } from 'express';

import config from '../config';

const loginRouter = Router();

// Cantidad de segundos en los que expira la sesión
const ttlSeconds = 300; // 300 seg = 5 minutos

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

loginRouter.use(cookieParser());

loginRouter.use(session(storeOptions));

declare module 'express-session' {
  interface SessionData {
    info: {
      loggedIn: boolean;
      username: string;
    };
  }
}

const validateLogin = (req: Request, res: Response, next: NextFunction) => {
  // Si el usuario se encuentra logueado, deja que continúe, sino redirecciona a '/login'
  if (req.session.info && req.session.info.loggedIn) next();
  else res.redirect('/login');
};

const users = [
  {
    username: 'aldocape',
    password: '123456',
  },
  {
    username: 'pepito',
    password: '1234',
  },
  {
    username: 'messi',
    password: 'elmasgrande',
  },
];

// El endpoint '/home' verifica que haya un usuario logueado
// por medio del middleware 'validateLogin', y en ese caso manda su 'username' como parámetro
// para que se muestre en la plantilla 'index'

loginRouter.get('/home', validateLogin, (req: Request, res: Response) => {
  res.render('index', { nombre: req.session.info?.username });
});

// La ruta raíz redirecciona a /home para poder hacer la verificación de usuario logueado
loginRouter.get('/', (req, res) => {
  res.redirect('/home');
});

loginRouter.post('/login', (req, res) => {
  const { username, password } = req.body;

  const index = users.findIndex(
    (usuario) => usuario.username === username && usuario.password === password
  );

  if (index < 0) {
    res.render('login', { msg: 'Usuario no autorizado' });
  } else {
    // Si encuentra al usuario en la base de datos, guarda el username en la info de sesión
    const user = users[index];
    req.session.info = {
      loggedIn: true,
      username: user.username,
    };
    // Redirecciono a '/home' con la sesión iniciada
    res.redirect('/home');
  }
});

loginRouter.get('/login', (req, res) => {
  res.render('login', { msg: '' });
});

loginRouter.get('/logout', (req, res) => {
  const loggedIn = req.session.info?.loggedIn;
  if (loggedIn) {
    const username = req.session.info?.username;
    req.session.destroy((err) => {
      if (!err) {
        res.render('logout', { username });
      } else {
        res.redirect('/');
      }
    });
  } else {
    res.redirect('/');
  }
});

export default loginRouter;
