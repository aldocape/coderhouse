// import { initMongoDB, disconnectMongo } from '../src/services/connect';
// import { UsuarioModel } from '../src/services/schema';
const { initMongoDB, disconnectMongo } = require('../src/services/connect');
const { UsuarioModel } = require('../src/services/schema');

const consultar = async () => {
  await initMongoDB();

  const q1 = await UsuarioModel.find();

  console.log('\n\n\nUsuarios con find');
  console.log(q1);

  //   const q2 = await UsuarioModel.find({ edad: { $gt: 33 } });
  //   console.log('\n\n\nUsuarios con find filtro edad mayor a 33');
  //   console.log(q2);

  //   const c1 = { edad: { $gt: 35 } };
  //   const c2 = { admin: false };

  //   const q3 = await UsuarioModel.find({
  //     $and: [c1, c2],
  //   });

  //   console.log(
  //     '\n\n\nUsuarios con find filtro edad mayor a 35 y que no sean admins'
  //   );
  //   console.log(q3);

  //   const q4 = await UsuarioModel.find({ admin: true }).sort({ edad: 1 });
  //   console.log('\n\n\nUsuarios con find + sort');
  //   console.log(q4);

  //   const q5 = await UsuarioModel.find({ admin: true })
  //     .sort({ edad: 1 })
  //     .limit(2);
  //   console.log('\n\n\nUsuarios con find + sort + limit');
  //   console.log(q5);

  //   const q6 = await UsuarioModel.find({ admin: true }, { nombre: 1, email: 1 })
  //     .sort({ edad: 1 })
  //     .limit(2);
  //   console.log('\n\n\nUsuarios con find + proyeccion + sort + limit');
  //   console.log(q6);

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
