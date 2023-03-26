import config from '../config';

import { DaoFactory } from './factory';

let DAO: any;
const daoArgs = config.ARGS.dao;

if (daoArgs === 'mongo') DAO = DaoFactory.create(daoArgs, true);
else DAO = DaoFactory.create(daoArgs, false);

let productsHandler: any;
let cartsHandler: any;
let usersHandler: any;
let messagesHandler: any;
let ordersHandler: any;

if (DAO) {
  productsHandler = DAO.productHandler();
  cartsHandler = DAO.cartsHandler();
  messagesHandler = DAO.messagesHandler();
  ordersHandler = DAO.ordersHandler();
}

// Creo una instancia de DAO para usuarios para manejar con mongo exclusivamente,
// porque sino no puedo implementar passport-local debido a que usuarios necesita la librería connect-mongo
if (daoArgs !== 'mongo') {
  DAO = DaoFactory.create('mongo', false);
}

// constantes que utilizo para probar que no se vuelvan a crear nuevas instancias del DAO
const DAO2 = DaoFactory.create(daoArgs, false);
const DAO3 = DaoFactory.create(daoArgs, false);

usersHandler = DAO.usersHandler();

// En cada operación con la BD, trabajo individualmente con cada uno de los objetos instanciados
export async function save(collection: string, obj: any) {
  switch (collection) {
    case 'product':
      return await productsHandler.save(obj);
    case 'cart':
      return await cartsHandler.save(obj);
    case 'user':
      return await usersHandler.save(obj);
    case 'message':
      return await messagesHandler.save(obj);
    case 'order':
      return await ordersHandler.save(obj);
    default:
      break;
  }
}

export async function getAll(collection: string) {
  switch (collection) {
    case 'product':
      return await productsHandler.getAll();
    case 'cart':
      return await cartsHandler.getAll();
    case 'user':
      return await usersHandler.getAll();
    case 'message':
      return await messagesHandler.getAll();
    case 'order':
      return await ordersHandler.getAll();
    default:
      break;
  }
}

export async function getById(collection: string, id: string) {
  switch (collection) {
    case 'product':
      return await productsHandler.getById(id);
    case 'cart':
      return await cartsHandler.getById(id);
    case 'user':
      return await usersHandler.getById(id);
    case 'message':
      return await messagesHandler.getById(id);
    case 'order':
      return await ordersHandler.getById(id);
    default:
      break;
  }
}

export async function deleteById(collection: string, id: string) {
  switch (collection) {
    case 'product':
      return await productsHandler.deleteById(id);
    case 'cart':
      return await cartsHandler.deleteById(id);
    case 'user':
      return await usersHandler.deleteById(id);
    case 'message':
      return await messagesHandler.deleteById(id);
    default:
      break;
  }
}

export async function deleteAll(collection: string) {
  switch (collection) {
    case 'product':
      return await productsHandler.deleteAll();
    case 'cart':
      return await cartsHandler.deleteAll();
    case 'user':
      return await usersHandler.deleteAll();
    case 'message':
      return await messagesHandler.deleteAll();
    default:
      break;
  }
}

export async function update(collection: string, id: string, obj: any) {
  switch (collection) {
    case 'product':
      return await productsHandler.update(id, obj);
    case 'cart':
      return await cartsHandler.update(id, obj);
    case 'user':
      return await usersHandler.update(id, obj);
    case 'message':
      return await messagesHandler.update(id, obj);
    case 'order':
      return await ordersHandler.update(id, obj);
    default:
      break;
  }
}

export async function findOne(collection: string, query: any) {
  if (collection === 'user') return await usersHandler.findOne(query);
}

export async function getMany(collection: string, query: any) {
  switch (collection) {
    case 'product':
      return await productsHandler.getMany(query);
    case 'cart':
      return await cartsHandler.getMany(query);
    case 'user':
      return await usersHandler.getMany(query);
    case 'message':
      return await messagesHandler.getMany(query);
    case 'order':
      return await ordersHandler.getMany(query);
    default:
      break;
  }
}

export async function encrypt(collection: string, password: string) {
  switch (collection) {
    case 'user':
      return await usersHandler.encryptPswd(password);
    default:
      break;
  }
}

export async function matchPassword(
  collection: string,
  password1: string,
  password2: string
) {
  switch (collection) {
    case 'user':
      return await usersHandler.matchPassword(password1, password2);
    default:
      break;
  }
}
