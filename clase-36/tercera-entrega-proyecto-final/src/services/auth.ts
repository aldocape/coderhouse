import passport from 'passport';
import UserModel from '../models/users';
import { Strategy as LocalStrategy } from 'passport-local';
import { ObjectId } from '../utils/tools';
import logger from '../middlewares/logger';

// cambiar el nombre de los campos si llega a ser distinto en la base de datos
// por defecto se puede omitir porque ya viene asignado esos valores
const strategyOptions: any = {
  usernameField: 'username',
  passwordField: 'password',
  passReqToCallback: true,
};

const signup = async (
  req: any,
  username: string,
  password: string,
  done: any
) => {
  try {
    logger.info('Signup ha sido exitoso!');

    const { nombre, direccion, edad, telefono, avatar } = req.body;

    const newUser = new UserModel({
      username,
      password,
      nombre,
      direccion,
      edad,
      telefono,
      avatar,
      carrito: new ObjectId(),
    });

    // const newUser = await UserModel.create({ username, password });
    newUser.password = await newUser.encryptPassword(password);
    await newUser.save();
    return done(null, newUser);
  } catch (err) {
    logger.error(err);
    return done(null, false, { message: 'Error inesperado - Clave duplicada' });
  }
};

const login = async (
  req: any,
  username: string,
  password: string,
  done: any
) => {
  try {
    // Busco sólo el username, no la password porque la tengo encriptada
    const user = await UserModel.findOne({ username });

    if (!user) {
      return done(null, false, {
        type: 'signUpMessage',
        message: 'El usuario no existe en el sistema',
      });
    } else {
      // Si el usuario existe, comparo la password que llega con la de la BD, con el método matchPassword
      const match = await user.matchPassword(password);
      // Si la contraseña es igual a la que está registrada en la clase (desencriptada), devuelve true
      // En ese caso, al método 'done' le pasamos user, sino false por 'no encontrado'
      if (match) {
        logger.info('Usuario encontrado!');
        return done(null, user);
      } else {
        // res.json({ msg: 'Error: La contraseña ingresada es incorrecta' });
        return done(null, false, {
          type: 'signUpMessage',
          message: 'La contraseña ingresada es incorrecta',
        });
      }
    }
  } catch (err) {
    logger.error(err);
  }
};

passport.serializeUser((user: any, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (userId, done) => {
  const user = await UserModel.findById(userId);
  return done(null, user);
});

export const loginFunction = new LocalStrategy(strategyOptions, login);
export const signUpFunction = new LocalStrategy(strategyOptions, signup);
