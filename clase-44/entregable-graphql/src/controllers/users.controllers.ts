import {
  saveUser,
  getUserById,
  findOneUser,
  updateUser,
  getAllUsers,
  matchPswd,
} from '../services/users.services';
import { Response, NextFunction } from 'express';

import passport from 'passport';

import { Strategy as LocalStrategy } from 'passport-local';
import { ObjectId, isValidObjectId } from '../utils/tools';
import logger from '../middlewares/logger';

// import { EmailService } from '../services/email';
import config from '../config';

// cambiar el nombre de los campos si llega a ser distinto en la base de datos
// por defecto se puede omitir porque ya viene asignado esos valores
const strategyOptions: any = {
  usernameField: 'username',
  passwordField: 'password',
  passReqToCallback: true,
};

export const signup = async (
  req: any,
  username: string,
  password: string,
  done: any
) => {
  try {
    logger.info('Signup ha sido exitoso!');

    const { nombre, direccion, edad, telefono, avatar } = req.body;

    const newUser = await saveUser({
      username,
      password,
      nombre,
      direccion,
      edad,
      telefono,
      avatar,
      admin: false,
      carrito: new ObjectId(),
    });

    return done(null, newUser);
  } catch (err) {
    logger.error(err);
    return done(null, false, { message: 'Error inesperado' });
  }
};

export const getAllUsersController = async (req: any, res: Response) => {
  try {
    const users = await getAllUsers();

    if (users) {
      res.json(users);
    } else {
      res.status(400).json({
        msg: 'Hubo un error al obtener los usuarios',
      });
    }
  } catch (err: any) {
    res.status(500).json({
      error: err.message,
    });
  }
};

export const updateUserController = async (req: any, res: Response) => {
  try {
    const { id } = req.params;
    if (isValidObjectId(id)) {
      // Mando al controller toda la data válida que llega desde el middleware
      const user = await updateUser(id, req.body);

      res.json(user);
    } else {
      res.status(500).json({
        msg: 'El id proporcionado no es un ObjectId válido para MongoDB',
      });
    }
  } catch (err: any) {
    res.status(500).json({
      error: err.message,
    });
  }
};

export const login = async (
  req: any,
  username: string,
  password: string,
  done: any
) => {
  try {
    // Busco sólo el username, no la password porque la tengo encriptada
    const user = await findOneUser({ username });

    if (!user) {
      return done(null, false, {
        type: 'signUpMessage',
        message: 'El usuario no existe en el sistema',
      });
    } else {
      // Si el usuario existe, comparo la password que llega con la de la BD, con el método matchPassword

      const match = await user.matchPassword(password);

      // const match = await matchPswd(password, user.password);
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

export const logout = async (req: any, res: Response, next: NextFunction) => {
  if (req.user && req.user.username) {
    try {
      const nombre = req.user.nombre;
      req.logout(function (err: any) {
        if (err) {
          return next(err);
        }

        if (nombre) {
          res.render('logout', { nombre });
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
};

// export const sendMail = async (req: any) => {
//   // Usuario creado, armo cuerpo de mensaje y envío de mail
//   const destination = config.GMAIL_EMAIL;
//   const subject = 'Nuevo Registro de Usuario';
//   const content = `
//       <p>Username: ${req.body.username}<br />
//       Nombre y apellido: ${req.body.nombre}<br />
//       Dirección: ${req.body.direccion}<br />
//       Edad: ${req.body.edad}<br />
//       Teléfono: ${req.body.telefono}<br />
//       Avatar: ${req.body.avatar}
//       </p>`;

//   const email = await EmailService.sendEmail(destination, subject, content);
//   return email;
// };

passport.serializeUser((user: any, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (userId: string, done) => {
  const user = await getUserById(userId);
  return done(null, user);
});

export const loginFunction = new LocalStrategy(strategyOptions, login);
export const signUpFunction = new LocalStrategy(strategyOptions, signup);
