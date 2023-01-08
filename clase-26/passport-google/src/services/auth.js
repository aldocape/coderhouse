import passport from 'passport';
import { Strategy as googleStrategy } from 'passport-google-oauth20';
import { ensureLoggedIn } from 'connect-ensure-login';
import { UserModel } from '../model/user.model.js';
import config from '../config/index.js';

passport.use(
  new googleStrategy({
    clientID: config.GOOGLE_CLIENT_ID,
    clientSecret: config.GOOGLE_CLIENT_SECRET,
    callbackURL: '/oauth2/redirect/accounts.google.com',
    scope: ['profile'],
    state: true,
  }),
  (accessToken, refreshToken, profile, done) => {
    return done(null, profile);
  }
);

// cambiar el nombre de los campos si llega a ser distinto en la base de datos
// por defecto se puede omitir porque ya viene asignado esos valores
const strategyOptions = {
  usernameField: 'username',
  passwordField: 'password',
  passReqToCallback: true,
};

const signup = async (req, username, password, done) => {
  try {
    console.log('Signup!');

    const newUser = new UserModel({ username, password });

    // const newUser = await UserModel.create({ username, password });
    newUser.password = await newUser.encryptPassword(password);
    await newUser.save();
    return done(null, newUser);
  } catch (err) {
    console.log(err);
    return done(null, false, { message: 'Error inesperado' });
  }
};

const login = async (req, username, password, done) => {
  try {
    console.log('Login!!');
    // Busco sólo el username, no la password porque la tengo encriptada
    const user = await UserModel.findOne({ username });

    if (!user) {
      return done(null, false, { msg: 'User not fonud' });
    } else {
      // Si el usuario existe, comparo la password que llega con la de la BD, con el método matchPassword
      const match = await user.matchPassword(password);
      // Si la contraseña es igual a la que está registrada en la clase (desencriptada), devuelve true
      // En ese caso, al método 'done' le pasamos user, sino false por 'no encontrado'
      match ? done(null, user) : done(null, false);
    }
    console.log('Usuario encontrado!!');
  } catch (err) {
    console.log(err);
  }
};

export const loginFunction = new LocalStrategy(strategyOptions, login);
export const signUpFunction = new LocalStrategy(strategyOptions, signup);

passport.serializeUser((user, done) => {
  console.log('Ejecuta serialize');
  done(null, user._id);
});

passport.deserializeUser((userId, done) => {
  console.log('Ejecuta deserialize');
  const user = UserModel.findById(userId);
  return done(null, user);
});
