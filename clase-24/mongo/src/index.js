import express from 'express';
import cookieParser from 'cookie-parser';
import session from 'express-session';

import MongoStore from 'connect-mongo';

const ttlSeconds = 180;

// Cambiar el mongo URL según si queremos conectarnos a la BD de Mongo local o a Mongo Atlas

// const mongoUrl = 'mongodb://admin:123456@localhost:27017/ecommerce';
const mongoUrl =
  'mongodb+srv://aldocape:h3r4cl3s@cluster0.rhuhd.mongodb.net/ecommerce?retryWrites=true&w=majority';
const advancedOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const storeOptions = {
  store: MongoStore.create({
    mongoUrl,
    mongoOptions: advancedOptions,
    crypto: {
      secret: 'horse',
    },
  }),
  secret: 'MiClaveSuperSecreta',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: ttlSeconds * 1000,
  },
};

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(session(storeOptions));

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
  res.send('Server funcionando');
});

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server up en puerto ${PORT}`);
});
