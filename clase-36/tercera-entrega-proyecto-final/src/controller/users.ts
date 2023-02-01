// Importo esquema de manejo de base de datos para usuarios
import UsersModel from '../models/users';

import logger from '../middlewares/logger';

// Clase Users con persistencia de datos en MongoDB

class Users {
  // Método getAll obtiene todos los usuarios

  async getAll() {
    const users = await UsersModel.find();
    return users;
  }

  async login(req: any, username: string, password: string, done: any) {
    try {
      // Busco sólo el username, no la password porque la tengo encriptada
      const user = await UsersModel.findOne({ username });

      if (!user) {
        return done(null, false, { msg: 'User not fonud' });
      } else {
        // Si el usuario existe, comparo la password que llega con la de la BD, con el método matchPassword
        const match = await user.matchPassword(password);
        // Si la contraseña es igual a la que está registrada en la clase (desencriptada), devuelve true
        // En ese caso, al método 'done' le pasamos user, sino false por 'no encontrado'
        match ? done(null, user) : done(null, false);
      }
      logger.info('Usuario encontrado!!');
    } catch (err) {
      logger.error(err);
    }
  }

  async signup(req: any, username: string, password: string, done: any) {
    try {
      logger.info('Signup exitoso!');

      const newUser = new UsersModel({ username, password });

      // const newUser = await UserModel.create({ username, password });
      newUser.password = await newUser.encryptPassword(password);
      await newUser.save();
      return done(null, newUser);
    } catch (err) {
      logger.error(err);
      return done(null, false, { message: 'Error inesperado' });
    }
  }

  // Método update actualiza un usuario, recibe dos variables por parámetro: el id y el usuario modificado
  // Con la propiedad new: true, le estamos diciendo que devuelva como resultado el usuario modificado
  async update(id: string, user: any) {
    // Actualizo el documento usando `updateOne()`
    await UsersModel.updateOne({ _id: id }, user);

    // Cargo el documento para ver los nuevos valores
    const updatedUser = await UsersModel.findOne();

    return updatedUser;
  }

  // // Método 'add' agrega un documento de tipo usuario a la colección 'users'
  // // encriptando previamente la password
  // async add(user: Usuario) {
  //   const newUser = new UsersModel(user);

  //   newUser.password = await newUser.encryptPassword(user.password);
  //   return await newUser.save();

  //   // const newUser = await UsersModel.create(user);
  //   // return newUser;
  // }

  // async findOne(user: Usuario) {
  //   // Busco sólo el username, no la password porque la tengo encriptada
  //   const findUser = await UsersModel.findOne({ username: user.username });
  //   return findUser;
  // }
}

const usrInstance = new Users();

// Exporto una instancia de la clase Users
export default usrInstance;
