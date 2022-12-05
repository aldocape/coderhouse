const mongoose = require('mongoose');
// import mongoose from 'mongoose';

// Formato del uri de Connection String:
// mongodb://<user>:<password>@localhost:27017/<database>?authSource=<authenticationDatabase>
const connectionString =
  'mongodb+srv://aldocape:h3r4cl3s@cluster0.rhuhd.mongodb.net/ecommerce?retryWrites=true&w=majority';

const initMongoDB = async () => {
  try {
    console.log('CONECTANDO A MI DB');
    mongoose.connect(connectionString, {
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
