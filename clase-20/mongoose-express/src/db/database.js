import mongoose from 'mongoose';

const connectionString =
  'mongodb+srv://aldocape:h3r4cl3s@cluster0.rhuhd.mongodb.net/ecommerce?retryWrites=true&w=majority';

export const initMongoDB = async () => {
  try {
    console.log('CONECTANDO A MI DB');
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
