"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.encrypt = exports.findOne = exports.update = exports.deleteById = exports.getById = exports.getAll = exports.save = void 0;
const mongodb_1 = __importDefault(require("./mongodb/mongodb"));
const mongodb_2 = require("./mongodb/mongodb");
const config_1 = __importDefault(require("../config"));
let persistenceProd;
let persistenceCart;
let persistenceUser;
let persistenceMessage;
let argv = config_1.default.PERSISTENCE;
switch (argv) {
    case 'file':
        break;
    case 'mongo':
        // Me conecto a la Base de Datos de Mongo e instancio un objeto de clase por cada colección
        (0, mongodb_2.initMongoDB)();
        persistenceProd = new mongodb_1.default('product');
        persistenceCart = new mongodb_1.default('cart');
        persistenceMessage = new mongodb_1.default('message');
        persistenceUser = new mongodb_1.default('user');
        console.log(argv);
        break;
    default:
        break;
}
// En cada operación con la BD, trabajo individualmente con cada uno de los objetos instanciados
function save(collection, obj) {
    return __awaiter(this, void 0, void 0, function* () {
        switch (collection) {
            case 'product':
                return yield persistenceProd.save(obj);
            case 'cart':
                return yield persistenceCart.save(obj);
            case 'user':
                return yield persistenceUser.save(obj);
            case 'message':
                return yield persistenceMessage.save(obj);
            default:
                break;
        }
    });
}
exports.save = save;
function getAll(collection) {
    return __awaiter(this, void 0, void 0, function* () {
        switch (collection) {
            case 'product':
                return yield persistenceProd.getAll();
            case 'cart':
                return yield persistenceCart.getAll();
            case 'user':
                return yield persistenceUser.getAll();
            case 'message':
                return yield persistenceMessage.getAll();
            default:
                break;
        }
    });
}
exports.getAll = getAll;
function getById(collection, id) {
    return __awaiter(this, void 0, void 0, function* () {
        switch (collection) {
            case 'product':
                return yield persistenceProd.getById(id);
            case 'cart':
                return yield persistenceCart.getById(id);
            case 'user':
                return yield persistenceUser.getById(id);
            case 'message':
                return yield persistenceMessage.getById(id);
            default:
                break;
        }
    });
}
exports.getById = getById;
function deleteById(collection, id) {
    return __awaiter(this, void 0, void 0, function* () {
        switch (collection) {
            case 'product':
                return yield persistenceProd.deleteById(id);
            case 'cart':
                return yield persistenceCart.deleteById(id);
            case 'user':
                return yield persistenceUser.deleteById(id);
            case 'message':
                return yield persistenceMessage.deleteById(id);
            default:
                break;
        }
    });
}
exports.deleteById = deleteById;
function update(collection, id, obj) {
    return __awaiter(this, void 0, void 0, function* () {
        switch (collection) {
            case 'product':
                return yield persistenceProd.update(id, obj);
            case 'cart':
                return yield persistenceCart.update(id, obj);
            case 'user':
                return yield persistenceUser.update(id, obj);
            case 'message':
                return yield persistenceMessage.update(id, obj);
            default:
                break;
        }
    });
}
exports.update = update;
function findOne(collection, field) {
    return __awaiter(this, void 0, void 0, function* () {
        switch (collection) {
            case 'user':
                return yield persistenceUser.findOne(field);
            default:
                break;
        }
    });
}
exports.findOne = findOne;
function encrypt(collection, password) {
    return __awaiter(this, void 0, void 0, function* () {
        switch (collection) {
            case 'user':
                return yield persistenceUser.encryptPswd(password);
            default:
                break;
        }
    });
}
exports.encrypt = encrypt;
