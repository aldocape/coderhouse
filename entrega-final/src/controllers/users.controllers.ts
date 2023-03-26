import {
  saveUser,
  findOneUser,
  getAllUsers,
  getUserById,
} from '../services/users.services';
import { saveCart } from '../services/carts.services';
import { Response, NextFunction } from 'express';
import { generateAuthToken } from '../utils/auth_jwt';
import logger from '../middlewares/logger';
import config from '../config';
import { EmailService } from '../services/email.services';

export const sendMail = async (user: any) => {
  // Usuario creado, armo cuerpo de mensaje y envío de mail
  const destination = config.GMAIL_EMAIL || 'aldocape@gmail.com';
  const subject = 'Nuevo Registro de Usuario';
  const content = `
      <p>Username: ${user.username}<br />
      Nombre y apellido: ${user.nombre}<br />
      Dirección: ${user.direccion}<br />
      Edad: ${user.edad}<br />
      Teléfono: ${user.telefono}<br />
      Administrador: ${user.admin ? 'Si' : 'No'}
      </p>`;

  const email = await EmailService.sendEmail(destination, subject, content);
  return email;
};

export const signUpController = async (req: any, res: Response) => {
  const user = await findOneUser({ username: req.user.username });

  if (user)
    return res
      .status(400)
      .json({ status: 'error', msg: 'Error: El E-Mail ya existe' });

  // Creamos un carrito vacío para el nuevo usuario
  const newCart = await saveCart({
    productos: [],
    direccion_entrega: req.user.direccion,
  });

  req.user.carrito = newCart;

  // Guardamos el usuario en la BD
  const newUser = await saveUser(req.user);

  // Enviamos mail con los datos del nuevo usuario registrado y creamos un token de acceso
  sendMail(newUser);
  const token = generateAuthToken(newUser);

  logger.info('Signup ha sido exitoso!');

  // Redirigimos a la home, con el token de acceso
  res.header('authentication', `Bearer ${token}`).json({
    status: 'Signup OK',
    msg: 'El usuario ha sido creado correctamente! Redirigiendo a la home...',
    token,
  });
};

export const loginController = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, password } = req.body;

    const user = await findOneUser({ username });

    if (!user) {
      return res.status(401).json({
        status: 'error',
        error: 'El usuario o la contraseña son incorrectos',
      });
    } else {
      // Si el usuario existe, comparo la password que llega con la de la BD, con el método matchPassword
      const match = await user.matchPassword(password);

      // Si la contraseña es igual a la que está registrada en la clase (desencriptada), devuelve true
      if (match) {
        const token = generateAuthToken(user);

        res.header('authorization', `Bearer ${token}`).json({
          token,
          user,
          status: 'Usuario logueado',
        });
      } else {
        res.status(401).json({
          status: 'error',
          error: 'El usuario o la contraseña son incorrectos',
        });
      }
    }
  } catch (err) {
    logger.error(err);
  }
};

export const getSession = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  res.json({
    status: 'ok',
    user: req.user,
  });
};

export const logout = async (req: any, res: Response, next: NextFunction) => {
  const { user_id } = req.params;
  const user = await getUserById(user_id);
  res.render('logout', { nombre: user.nombre });
};
