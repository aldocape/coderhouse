import MongoDB from './mongodb/mongodb';
import { initMongoDB } from './mongodb/mongodb';
import config from '../config';

let persistenceProd: any;
let persistenceCart: any;
let persistenceUser: any;
let persistenceMessage: any;

let argv = config.PERSISTENCE;

switch (argv) {
  case 'file':
    break;
  case 'mongo':
    // Me conecto a la Base de Datos de Mongo e instancio un objeto de clase por cada colección
    initMongoDB();
    persistenceProd = new MongoDB('product');
    persistenceCart = new MongoDB('cart');
    persistenceMessage = new MongoDB('message');
    persistenceUser = new MongoDB('user');
    console.log(argv);
    break;
  default:
    break;
}

// En cada operación con la BD, trabajo individualmente con cada uno de los objetos instanciados

export async function save(collection: string, obj: any) {
  switch (collection) {
    case 'product':
      return await persistenceProd.save(obj);
    case 'cart':
      return await persistenceCart.save(obj);
    case 'user':
      return await persistenceUser.save(obj);
    case 'message':
      return await persistenceMessage.save(obj);
    default:
      break;
  }
}

export async function getAll(collection: string) {
  switch (collection) {
    case 'product':
      return await persistenceProd.getAll();
    case 'cart':
      return await persistenceCart.getAll();
    case 'user':
      return await persistenceUser.getAll();
    case 'message':
      return await persistenceMessage.getAll();
    default:
      break;
  }
}

export async function getById(collection: string, id: string) {
  switch (collection) {
    case 'product':
      return await persistenceProd.getById(id);
    case 'cart':
      return await persistenceCart.getById(id);
    case 'user':
      return await persistenceUser.getById(id);
    case 'message':
      return await persistenceMessage.getById(id);
    default:
      break;
  }
}

export async function deleteById(collection: string, id: string) {
  switch (collection) {
    case 'product':
      return await persistenceProd.deleteById(id);
    case 'cart':
      return await persistenceCart.deleteById(id);
    case 'user':
      return await persistenceUser.deleteById(id);
    case 'message':
      return await persistenceMessage.deleteById(id);
    default:
      break;
  }
}

export async function update(collection: string, id: string, obj: any) {
  switch (collection) {
    case 'product':
      return await persistenceProd.update(id, obj);
    case 'cart':
      return await persistenceCart.update(id, obj);
    case 'user':
      return await persistenceUser.update(id, obj);
    case 'message':
      return await persistenceMessage.update(id, obj);
    default:
      break;
  }
}

export async function findOne(collection: string, field: any) {
  switch (collection) {
    case 'user':
      return await persistenceUser.findOne(field);
    default:
      break;
  }
}

export async function encrypt(collection: string, password: string) {
  switch (collection) {
    case 'user':
      return await persistenceUser.encryptPswd(password);
    default:
      break;
  }
}
