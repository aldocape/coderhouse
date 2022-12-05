import { initMongoDB, disconnectMongo } from './db/database.js';
import { UsuarioModel } from '../userSchema.js';

// import mongoose from 'mongoose';

// const usuariosCollection = 'usuario';

// const UsuarioSchema = new mongoose.Schema(
//   {
//     nombre: { type: String, require: true, max: 100 },
//     apellido: { type: String, require: true, max: 100 },
//     dni: { type: String, require: true, max: 10 },
//   },
//   { timestamps: true }
// );

// const UsuarioModel = mongoose.model(usuariosCollection, UsuarioSchema);

// import { ProductsModel } from '../src/models/products';
// import express from 'express';
// import mainRouter from './routes/index.js';

// import { initMongoDB, disconnectMongo } from '../src/services/connect';
// import { UsuarioModel } from '../src/services/schema';
// const { initMongoDB, disconnectMongo } = require('../src/services/connect');
// const { UsuarioModel } = require('../src/services/schema');

const consultar = async () => {
  await initMongoDB();

  // const q1 = await ProductsModel.find();
  const q1 = await UsuarioModel.find();

  console.log('\n\n\nUsuarios con find');
  console.log(q1);

  await disconnectMongo();
};

/**
 * Crear un Documento
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

// const app = express();

// app.use(express.json());

// app.use('/api', mainRouter);

// const init = async () => {
//   await initMongoDB();
//   const puerto = 8080;

//   app.listen(puerto, () => console.log(`SERVER OK ON PORT ${puerto}`));
// };

// init();
