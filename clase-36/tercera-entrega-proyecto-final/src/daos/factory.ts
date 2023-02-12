import DaoMongoDB from './dao-mongodb/mongodb';
import DaoFileSystem from './dao-filesystem/filesystem';

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
}

class MongoDB extends DAO {
  constructor() {
    const instances = {
      products: DaoMongoDB.getInstance('product'),
      carts: DaoMongoDB.getInstance('cart'),
      messages: DaoMongoDB.getInstance('message'),
      users: DaoMongoDB.getInstance('user'),
    };
    super(instances);
  }
}

class FileSystem extends DAO {
  constructor() {
    const instances = {
      products: DaoFileSystem.getInstance('product'),
      carts: DaoFileSystem.getInstance('cart'),
      messages: DaoFileSystem.getInstance('message'),
      users: DaoFileSystem.getInstance('user'),
    };
    super(instances);
  }
}

class Memory extends DAO {
  constructor() {
    super({});
  }
}

export class DaoFactory {
  static create(type: string) {
    switch (type) {
      case 'file':
        return new FileSystem();
      case 'mongo':
        return new MongoDB();

      default:
        break;
    }
  }
}
