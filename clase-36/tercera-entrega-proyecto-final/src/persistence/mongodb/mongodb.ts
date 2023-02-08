import mongoose, { Document } from 'mongoose';
import config from '../../config';
import logger from '../../middlewares/logger';

// Importo modelos para cada una de las colecciones
import MessagesModel from '../../models/messages';
import ProductsModel from '../../models/products';
import CartsModel from '../../models/carts';
import UsersModel from '../../models/users';

const connectionString = config.MONGO_ATLAS_URL;

// Conexión a la BD de Mongo
export const initMongoDB = async () => {
  try {
    logger.info('Connecting...');
    mongoose.set('strictQuery', false);
    const db = await mongoose.connect(connectionString);

    logger.info(`Database is connected to: ${db.connection.name}`);
  } catch (error) {
    logger.error(`ERROR => ${error}`);
  }
};

// Desconexión de la BD de Mongo
export const disconnectMongo = async () => {
  try {
    logger.info('Disconnecting from database...');
    await mongoose.disconnect();

    logger.info('Succesful disconnected');
  } catch (error) {
    logger.error(`ERROR => ${error}`);
    return error;
  }
};

export default class MongoDB {
  collection: string;
  model: any;

  constructor(collection: string) {
    this.collection = collection;

    switch (collection) {
      case 'product':
        this.model = ProductsModel;
        break;
      case 'cart':
        this.model = CartsModel;
        break;
      case 'message':
        this.model = MessagesModel;
        break;
      case 'user':
        this.model = UsersModel;
        break;

      default:
        break;
    }
  }

  async getAll() {
    try {
      let documents: any;
      if (this.collection === 'message') {
        // Para la colección de mensajes, utilizo lean para que lo devuelva
        // como objeto simple, plano, y de esa manera poder hacer luego la normalización
        documents = await this.model.find().lean();
      } else {
        documents = await this.model.find();
      }

      return documents;
    } catch (err: any) {
      console.log(err);
    }
  }

  async save(document: any) {
    try {
      let newObject;
      // Hago un condicional especial para usar el método 'encryptPassword' que sólo está
      // en el esquema de usuario
      if (this.collection === 'user') {
        const newUser = new UsersModel(document);
        newUser.password = await newUser.encryptPassword(document.password);
        newObject = await newUser.save();
      } else {
        // En el resto de las colecciones, hago la operación habitual de guardado
        newObject = await this.model.create(document);
      }
      return newObject;
    } catch (err) {
      console.log(err);
    }
  }

  async getById(id: string) {
    try {
      let doc: Document;
      // Pregunto si estoy en la colección de carrito para poder traerlo con toda la info
      // de sus productos los cuales obtengo con 'populate'
      if (this.collection === 'cart') {
        doc = await this.model.findById(id).populate({
          path: 'productos',
        });
      } else {
        doc = await this.model.findById(id);
      }
      return doc;
    } catch (err) {
      console.log(err);
    }
  }

  async deleteById(id: string) {
    try {
      const document = await this.model.findByIdAndDelete(id);
      return document;
    } catch (err) {
      console.log(err);
    }
  }

  // Método update actualiza un documento, recibe dos variables por parámetro: el id y el documento modificado
  async update(id: string, obj: any) {
    // Actualizo el documento usando `updateOne()`
    await this.model.updateOne({ _id: id }, obj);

    // Cargo el documento para ver los nuevos valores
    const updatedDocument = await this.model.findOne();

    return updatedDocument;
  }

  async findOne(field: any) {
    try {
      const document = await this.model.findOne(field);
      return document;
    } catch (err) {
      console.log(err);
    }
  }
}
