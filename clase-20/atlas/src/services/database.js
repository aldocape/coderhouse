import mongoose from 'mongoose';

const connectionString =
  process.env.MONGO_ATLAS_SRV ||
  'mongodb://encargado:qwerty123@localhost:27017/empresa?authSource=admin';

export const initMongoDB = async () => {
  try {
    console.log('CONECTANDO A MI DB...');
    await mongoose.connect(connectionString);

    console.log('YA ESTOY CONECTADO');
  } catch (error) {
    console.log(`ERROR => ${error}`);
    return error;
  }
};

export const disconnectMongo = async () => {
  try {
    console.log('DESCONECTANDO DE MI DB');
    await mongoose.disconnect();

    console.log('DESCONEXION OK');
  } catch (error) {
    console.log(`ERROR => ${error}`);
    return error;
  }
};
