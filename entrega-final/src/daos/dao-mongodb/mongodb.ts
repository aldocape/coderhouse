import mongoose, { Document } from 'mongoose';
import config from '../../config';
import logger from '../../middlewares/logger';
import { isValidObjectId } from '../../utils/tools';

// Importo modelos para cada una de las colecciones
import MessagesModel from '../../models/messages';
import ProductsModel from '../../models/products';
import CartsModel from '../../models/carts';
import UsersModel from '../../models/users';
import OrdersModel from '../../models/orders';
import ProductsDTO from '../../dto/products.dto';
import MessagesDTO from '../../dto/messages.dto';

const connectionString = config.MONGO_ATLAS_URL;
mongoose.set('strictQuery', false);

export default class DaoMongoDB {
  private collection: string;
  private model: any;
  private static connection: any;
  private static instance: DaoMongoDB;

  private constructor(collection: string) {
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
      case 'order':
        this.model = OrdersModel;
        break;

      default:
        break;
    }
  }

  // Implementación de patrón singleton (únicamente para hacer una única conexión a la BD) porque
  // en realidad necesitamos varias instancias de esta clase para trabajar con las distintas colecciones
  public static getInstance(collection: string): DaoMongoDB {
    if (!DaoMongoDB.instance) {
      logger.info('Connecting...');

      // Conexión a la BD de Mongo
      DaoMongoDB.connection = mongoose
        .connect(connectionString)
        .then((con) => {
          logger.info(`Database is connected to: ${con.connection.name}`);
        })
        .catch((con) => {
          logger.error(
            'Hubo un error en el acceso a la base de datos de MongoDB'
          );
        });
    }
    DaoMongoDB.instance = new DaoMongoDB(collection);
    logger.info(`Instancia de clase: ${collection} iniciada`);
    return DaoMongoDB.instance;
  }

  async disconnectMongo() {
    try {
      logger.info('Disconnecting from database...');
      mongoose.disconnect().then((result) => {
        logger.info('Succesful disconnected');
      });
    } catch (error) {
      logger.error(`ERROR => ${error}`);
      return error;
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
      if (documents)
        switch (this.collection) {
          case 'product':
            return documents.map(
              (producto: any) => new ProductsDTO(producto, true)
            );
          case 'message':
            return documents.map(
              (message: any) => new MessagesDTO(message, true)
            );
          default:
            return documents;
        }
    } catch (err: any) {
      logger.error(`ERROR => ${err}`);
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
      logger.error(`ERROR => ${err}`);
    }
  }

  async getById(id: string) {
    try {
      if (isValidObjectId(id)) {
        let doc: any;
        // Pregunto si estoy en la colección de carrito para poder traerlo con toda la info
        // de sus productos los cuales obtengo con 'populate'
        if (this.collection === 'cart') {
          doc = await this.model.findById(id).populate('productos.prodId');
        } else {
          doc = await this.model.findById(id);
          if (doc)
            switch (this.collection) {
              case 'product':
                return new ProductsDTO(doc, true);

              case 'message':
                return new MessagesDTO(doc, true);
              default:
                break;
            }
        }
        return doc;
      } else {
        return {
          error: true,
          msg: 'El id proporcionado no es un ObjectId válido para MongoDB',
        };
      }
    } catch (err) {
      logger.error(`ERROR => ${err}`);
    }
  }

  // Método update actualiza un documento, recibe dos variables por parámetro: el id y el documento modificado
  async update(id: string, obj: any) {
    try {
      if (isValidObjectId(id)) {
        const document = await this.model.findOneAndUpdate({ _id: id }, obj, {
          new: true,
        });

        return document;
      } else {
        return {
          error: true,
          msg: 'El id proporcionado no es un ObjectId válido para MongoDB',
        };
      }
    } catch (err) {
      logger.error(`ERROR => ${err}`);
    }
  }

  async findOne(query: any) {
    try {
      const document = await this.model.findOne(query);
      return document;
    } catch (err) {
      logger.error(`ERROR => ${err}`);
    }
  }

  async deleteById(id: string) {
    try {
      if (isValidObjectId(id)) {
        const document = await this.model.findByIdAndDelete(id);
        return document;
      } else {
        return {
          msg: 'El id proporcionado no es un ObjectId válido para MongoDB',
        };
      }
    } catch (err) {
      logger.error(`ERROR => ${err}`);
    }
  }

  async deleteAll() {
    try {
      const deleted = await this.model.deleteMany();
      return deleted;
    } catch (err) {
      logger.error(`ERROR => ${err}`);
    }
  }

  async getMany(query: any) {
    try {
      let documents: any;
      if (this.collection === 'message') {
        documents = await this.model
          .find({ 'user.username': query.username })
          .exec();
      } else {
        documents = await this.model.find(query).exec();
      }
      if (documents)
        switch (this.collection) {
          case 'message':
            return documents.map(
              (message: any) => new MessagesDTO(message, true)
            );
          case 'product':
            return documents.map(
              (producto: any) => new ProductsDTO(producto, true)
            );
          default:
            return documents;
        }
    } catch (error: any) {
      logger.error(`ERROR => ${error}`);
    }
  }
}
