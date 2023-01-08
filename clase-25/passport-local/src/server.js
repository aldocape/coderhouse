import express from 'express';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import { initDb } from './db/db.js';
import config from './config/index.js';
import passport from 'passport';
import { loginFunction, signUpFunction } from './services/auth.js';
import mainRouter from './routes/user.routes.js';

const app = express();

app.use(express.json());

await initDb();

console.log('Conectado a la base de datos');

const ttlSeconds = 180;

const StoreOptions = {
  store: MongoStore.create({
    mongoUrl: config.MONGO_ATLAS_URL,
  }),
  secret: 'claveSecreta',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: ttlSeconds * 1000,
  },
};

app.use(session(StoreOptions));

app.use(passport.initialize());
app.use(passport.session());

passport.use('login', loginFunction);
passport.use('signup', signUpFunction);

app.use('/api', mainRouter);
app.get('/', (req, res) => {
  res.send('Bienvenido a la API que implementa el uso de passport');
});

app.listen(config.PORT, () => {
  console.log(`Server ok en puerto ${config.PORT}`);
});
