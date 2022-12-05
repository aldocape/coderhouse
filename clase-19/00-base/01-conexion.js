const mongoose = require('mongoose');

// Formato del uri de Connection String:
// mongodb://<user>:<password>@localhost:27017/<database>?authSource=<authenticationDatabase>
const connectionString =
  'mongodb://encargado:qwerty123@localhost:27017/empresa?authSource=admin';

const initMongoDB = async () => {
  try {
    console.log('CONECTANDO A MI DB');
    await mongoose.connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('YA ESTOY CONECTADO');
  } catch (error) {
    console.log(`ERROR => ${error}`);
    return error;
  }
};

const disconnectMongo = async () => {
  try {
    console.log('DESCONECTANDO DE MI DB');
    await mongoose.disconnect();

    console.log('DESCONEXION OK');
  } catch (error) {
    console.log(`ERROR => ${error}`);
    return error;
  }
};

module.exports = { initMongoDB, disconnectMongo };
