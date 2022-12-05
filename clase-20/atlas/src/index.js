import 'dotenv/config';
// require('dotenv').config()
import { initMongoDB, disconnectMongo } from '../src/services/database.js';
// const { initMongoDB, disconnectMongo } = require('../src/services/database');
// const { UsuarioModel } = require('../src/services/schema');
import { UsuarioModel } from '../src/services/schema.js';

const consultar = async () => {
  await initMongoDB();

  const q1 = await UsuarioModel.find();

  console.log('\n\n\nUsuarios con find');
  console.log(q1);

  await disconnectMongo();
};

const crearUsuario = async (newUsuario) => {
  console.log(`Vamos a crear a ${newUsuario.nombre}`);
  await UsuarioModel.create(newUsuario);
  console.log('DONE\n\n');
};

const crear = async () => {
  await initMongoDB();

  const newUsuario = {
    nombre: 'Aldo',
    apellido: 'Capezzali',
    dni: '18885115',
  };

  await crearUsuario(newUsuario);

  console.log(`Usuario ${newUsuario.nombre} creado`);

  await disconnectMongo();
};

// crear();
consultar();
