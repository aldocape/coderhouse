import mongoose from 'mongoose';

const connectionString =
  process.env.MONGO_ATLAS_SRV ||
  'mongodb://aldo:123456@localhost:27017/ecommerce';

// Conexión a la BD de Mongo
(async () => {
  try {
    console.log('Connecting...');
    const db = await mongoose.connect(connectionString);

    console.log('Database is connected to:', db.connection.name);
  } catch (error) {
    console.error(error);
  }
})();

export const disconnectMongo = async () => {
  try {
    console.log('Disconnecting from database...');
    await mongoose.disconnect();

    console.log('Succesful disconnected');
  } catch (error) {
    console.log(`ERROR => ${error}`);
    return error;
  }
};
