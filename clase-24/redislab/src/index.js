import express from 'express';
import config from './config';
import cookieParser from 'cookie-parser';
import session from 'express-session';

import connectRedis from 'connect-redis';
import { createClient } from 'redis';

const RedisStore = connectRedis(session);

const redisClient = createClient({
  socket: {
    host: config.REDIS_URL,
    port: config.REDIS_PORT,
  },
  password: config.REDIS_PSW,
  legacyMode: true,
});

// In node-redis V4, the client does not automatically connect to the server,
// you need to run .connect() before any command, or you will receive error
// ClientClosedError: The client is closed.

(async () => {
  try {
    await redisClient.connect();
  } catch (error) {
    console.error(error);
  }
})();

redisClient.on('error', (err) => {
  console.log('Error ' + err);
});

const ttlSeconds = 180;

const storeOptions = {
  store: new RedisStore({
    client: redisClient,
    prefix: 'session:',
    ttl: ttlSeconds,
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

app.listen(config.PORT, () => {
  console.log(`Server up en puerto ${config.PORT}`);
});
