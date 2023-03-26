import DaoMongoDB from './dao-mongodb/mongodb';
import DaoFileSystem from './dao-filesystem/filesystem';
import DaoMemory from './dao-memory/memory';
import logger from '../middlewares/logger';

class DAO {
  instances;

  constructor(inst: any) {
    this.instances = inst;
  }

  // Creo getters de las instancias de clases de cada recurso que obligan a tener los mismos métodos en todas las persistencias
  // De esta manera, sin importar la persistencia, tenemos handlers que manejan todos los recursos de igual manera
  productHandler() {
    return this.instances.products;
  }

  usersHandler() {
    return this.instances.users;
  }

  messagesHandler() {
    return this.instances.messages;
  }

  cartsHandler() {
    return this.instances.carts;
  }

  ordersHandler() {
    return this.instances.orders;
  }
}

class MongoDB extends DAO {
  private static instance: MongoDB;
  private constructor(soloMongo: boolean) {
    let instances = {};
    if (soloMongo) {
      instances = {
        products: DaoMongoDB.getInstance('product'),
        carts: DaoMongoDB.getInstance('cart'),
        messages: DaoMongoDB.getInstance('message'),
        orders: DaoMongoDB.getInstance('order'),
        users: DaoMongoDB.getInstance('user'),
      };
    } else {
      instances = {
        users: DaoMongoDB.getInstance('user'),
      };
    }
    super(instances);
  }

  public static getInstance(soloMongo: boolean): MongoDB {
    if (!MongoDB.instance) {
      logger.info('Iniciando instancia de MongoDB en Factory');
      MongoDB.instance = new MongoDB(soloMongo);
    }
    return MongoDB.instance;
  }
}

class FileSystem extends DAO {
  private static instance: FileSystem;
  private constructor() {
    // No creo una instancia para manejo de usuarios porque
    // no se puede implementar usando passport local y connect-mongo
    const instances = {
      products: DaoFileSystem.getInstance('product'),
      carts: DaoFileSystem.getInstance('cart'),
      messages: DaoFileSystem.getInstance('message'),
      orders: DaoFileSystem.getInstance('order'),
    };
    super(instances);
  }

  public static getInstance(): FileSystem {
    if (!FileSystem.instance) {
      logger.info('Iniciando instancia de FileSystem en Factory');
      FileSystem.instance = new FileSystem();
    }
    return FileSystem.instance;
  }
}

class Memory extends DAO {
  private static instance: Memory;
  private constructor() {
    // No creo una instancia para manejo de usuarios porque
    // no se puede implementar usando passport local y connect-mongo
    const instances = {
      products: DaoMemory.getInstance('product'),
      carts: DaoMemory.getInstance('cart'),
      messages: DaoMemory.getInstance('message'),
      orders: DaoMemory.getInstance('order'),
    };
    super(instances);
  }

  public static getInstance(): Memory {
    if (!Memory.instance) {
      logger.info('Iniciando instancia de Memory en Factory');
      Memory.instance = new Memory();
    }
    return Memory.instance;
  }
}

export class DaoFactory {
  static create(type: string, esMongo: boolean) {
    // esMongo es una variable booleana que me sirve para saber si voy a usar un dao distinto a mongo
    // ya que de esa manera necesito instanciar mongo sólo para usuarios, por tema passport-local

    switch (type) {
      case 'mongo':
        const factoryMongo = MongoDB.getInstance(esMongo);
        return factoryMongo;
      case 'file':
        const factoryFile = FileSystem.getInstance();
        return factoryFile;
      case 'memory':
        const factoryMemory = Memory.getInstance();
        return factoryMemory;
      default:
        break;
    }
  }
}
