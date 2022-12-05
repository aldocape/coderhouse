import mongoose from 'mongoose';

const connectionString =
  process.env.MONGO_ATLAS_SRV ||
  'mongodb://admin:123456@localhost:27017/ecommerce?authSource=ecommerce';

// mongodb+srv://aldocape:h3r4cl3s@cluster0.rhuhd.mongodb.net/?retryWrites=true&w=majority

// mongodb+srv://admin:wH36iV422HeSthLy@cluster0.rhuhd.mongodb.net/test

// mongodb+srv://aldocape:h3r4cl3s@cluster0.rhuhd.mongodb.net/eshop-database

export const initMongoDB = async () => {
  try {
    console.log('CONECTANDO A MI DB');
    await mongoose.connect(connectionString, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    });

    console.log('YA ESTOY CONECTADO');
  } catch (error) {
    console.log(`ERROR => ${error}`);
    return error;
  }
};

export const disconnectMongoDB = async () => {
  try {
    console.log('DESCONECTANDO DE MI DB');
    await mongoose.disconnect();

    console.log('DESCONEXION OK');
  } catch (error) {
    console.log(`ERROR => ${error}`);
    return error;
  }
};
