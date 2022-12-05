// import Server from './services/server';

// const PORT = 8080;

// Server.listen(PORT, () => {
//   console.log(`Server up en puerto ${PORT}`);
// });

import { initMongoDB, disconnectMongo } from '../src/services/connect';
import { UsuarioModel } from '../src/services/schema';
// const { initMongoDB, disconnectMongo } = require('../src/services/connect');
// const { UsuarioModel } = require('../src/services/schema');

const consultar = async () => {
  await initMongoDB();

  const q1 = await UsuarioModel.find();

  console.log('\n\n\nUsuarios con find');
  console.log(q1);

  await disconnectMongo();
};

/**
 * Crear un Usuario
 */

const crearUsuario = async (newUsuario) => {
  console.log(`Vamos a crear a ${newUsuario.nombre}`);
  await UsuarioModel.create(newUsuario);
  console.log('DONE\n\n');
};

const crear = async () => {
  await initMongoDB();

  const newUsuario = {
    nombre: 'Federico',
    apellido: 'Perez',
    dni: '320118321',
  };

  await crearUsuario(newUsuario);

  await disconnectMongo();
};

consultar();
// crear();
