import express from 'express';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import config from './config/index.js';
import passport from 'passport';
import mainRouter from './routes/user.routes.js';

import { Strategy as googleStrategy } from 'passport-google-oauth20';

passport.use(
  new googleStrategy(
    {
      clientID: config.GOOGLE_CLIENT_ID,
      clientSecret: config.GOOGLE_CLIENT_SECRET,
      callbackURL: '/oauth2/redirect/accounts.google.com',
      scope: ['profile'],
      state: true,
    },
    (accessToken, refreshToken, profile, done) => {
      return done(null, profile);
    }
  )
);

import path from 'path';
import cors from 'cors';

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

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((id, done) => {
  done(null, id);
});

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cors es para que permita el uso de los headers en las peticiones
app.use(cors());

// Vistas
app.set('view engine', 'ejs');
app.set('views', path.resolve() + '/views');

app.use(session(StoreOptions));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', mainRouter);

app.listen(config.PORT, () => {
  console.log(`Server ok en puerto ${config.PORT}`);
});
