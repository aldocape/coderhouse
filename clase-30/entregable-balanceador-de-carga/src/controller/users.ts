// Importo estructura de datos y esquema de manejo de base de datos para usuarios
import { Usuario } from '../interfaces';

import UsersModel from '../models/users';

// Clase Users con persistencia de datos en MongoDB

class Users {
  // Método getAll obtiene todos los usuarios

  async getAll() {
    const users = await UsersModel.find();
    return users;
  }

  async login(req: any, username: string, password: string, done: any) {
    try {
      console.log('Login!!');
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
      console.log('Usuario encontrado!!');
    } catch (err) {
      console.log(err);
    }
  }

  async signup(req: any, username: string, password: string, done: any) {
    try {
      console.log('Signup!');

      const newUser = new UsersModel({ username, password });

      // const newUser = await UserModel.create({ username, password });
      newUser.password = await newUser.encryptPassword(password);
      await newUser.save();
      return done(null, newUser);
    } catch (err) {
      console.log(err);
      return done(null, false, { message: 'Error inesperado' });
    }
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
