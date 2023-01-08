import cookieParser from 'cookie-parser';
import express from 'express';
import session from 'express-session';
import sessionFileStore from 'session-file-store';

const app = express();

const FileStore = sessionFileStore(session);

const ttlSeconds = 180;

const fileStoreOptions = {
  store: new FileStore({
    path: './sessions', // Path donde se almacenan los archivos de la sesión
    ttl: ttlSeconds, // Tiempo en segundos que dura la sesión
    retries: 3, // Las veces que intentará acceder al archivo de sesiones
    reapInterval: 10, // Intervalo en segundos para limpiar la carpeta donde almacenamos las sesiones, cuando una sesión ya caducó, borra el archivo automáticamente
  }),
  secret: 'MiClaveSuperSecreta',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: ttlSeconds * 1000,
  },
};

app.use(express.json());
app.use(cookieParser());
app.use(session(fileStoreOptions));

const users = [
  {
    username: 'aldocape',
    password: '123456',
    admin: true,
  },
  {
    username: 'pepito',
    password: '1234',
    admin: false,
  },
];

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  const index = users.findIndex(
    (usuario) => usuario.username === username && usuario.password === password
  );

  if (index < 0) {
    res.status(401).json({
      msg: 'No estas autorizado',
    });
  } else {
    const user = users[index];
    req.session.info = {
      loggedIn: true,
      counter: 1,
      username: user.username,
      admin: user.admin,
    };
    res.json({
      msg: `Bienvenido ${user.username}!!!`,
    });
  }
});

app.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (!err) {
      res.json({
        msg: 'Session destroyed',
      });
    } else {
      res.json({
        status: 'Error en el logout',
        body: err,
      });
    }
  });
});

const validateLogin = (req, res, next) => {
  if (req.session.info && req.session.info.loggedIn) next();
  else res.status(401).json({ msg: 'No estás autorizado' });
};

const isAdmin = (req, res, next) => {
  if (req.session.info && req.session.info.loggedIn && req.session.info.admin)
    next();
  else res.status(401).json({ msg: 'No estás autorizado' });
};

app.get('/secret-endpoint', validateLogin, (req, res) => {
  req.session.info.counter++;
  res.json({
    msg: 'Información ultra secreta',
    counter: `${req.session.info.username} ha visitado el sitio ${req.session.info.counter} veces`,
    session: req.session,
  });
});

app.get('/admin-secret-endpoint', validateLogin, isAdmin, (req, res) => {
  req.session.info.counter++;
  res.json({
    msg: 'Información ultra secreta',
    session: req.session,
    sessionId: req.sessionID,
  });
});

app.get('/', (req, res) => {
  res.json({
    msg: 'ok',
  });
});

export default app;
