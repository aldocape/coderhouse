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
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const messages_dto_1 = __importDefault(require("../../dto/messages.dto"));
const products_dto_1 = __importDefault(require("../../dto/products.dto"));
const logger_1 = __importDefault(require("../../middlewares/logger"));
const uuid_1 = require("uuid");
class DaoFileSystem {
    constructor(collection) {
        this.collection = collection;
        this.file = '';
        switch (collection) {
            case 'product':
                this.file = '../../../products.json';
                break;
            case 'cart':
                this.file = '../../../carts.json';
                break;
            case 'message':
                this.file = '../../../messages.json';
                break;
            default:
                break;
        }
    }
    static getInstance(collection) {
        DaoFileSystem.instance = new DaoFileSystem(collection);
        logger_1.default.info(`Instancia de clase: ${collection} iniciada`);
        return DaoFileSystem.instance;
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Intento leer el archivo
                const filePath = path_1.default.resolve(__dirname, this.file);
                const content = yield fs_1.default.promises.readFile(filePath, 'utf8');
                // Transformo la data que llegó en un array de objetos
                const items = JSON.parse(content);
                if (items)
                    switch (this.collection) {
                        case 'product':
                            return items.map((producto) => new products_dto_1.default(producto, false));
                        case 'message':
                            return items.map((message) => new messages_dto_1.default(message, false));
                        default:
                            break;
                    }
            }
            catch (err) {
                logger_1.default.error(`ERROR => ${err}`);
            }
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Intento leer el archivo, y si existe guardo los datos en un objeto 'info'
                const filePath = path_1.default.resolve(__dirname, this.file);
                const content = yield fs_1.default.promises.readFile(filePath, 'utf8');
                const info = JSON.parse(content);
                // Con el método 'find' de array, busco el item que tenga el mismo id que el que se busca
                let item = info.find((e) => e.id == id);
                if (item)
                    switch (this.collection) {
                        case 'product':
                            return new products_dto_1.default(item, false);
                        case 'message':
                            return new messages_dto_1.default(item, false);
                        default:
                            break;
                    }
            }
            catch (err) {
                logger_1.default.error(`ERROR => ${err}`);
            }
        });
    }
    save(document) {
        return __awaiter(this, void 0, void 0, function* () {
            const filePath = path_1.default.resolve(__dirname, this.file);
            try {
                // Intento leer el archivo cuyo nombre pasé al constructor
                const content = yield fs_1.default.promises.readFile(filePath, 'utf8');
                // Si salió todo bien, es decir, no se va al catch, entonces almaceno los datos como objeto
                const itemsList = JSON.parse(content);
                document.id = (0, uuid_1.v4)();
                // Agrego al array el nuevo item
                itemsList.push(document);
                try {
                    // Intento escribir en el archivo, con los nuevos datos
                    yield fs_1.default.promises.writeFile(filePath, JSON.stringify(itemsList, null, 2));
                    // Devuelvo el nuevo objeto
                    return document;
                }
                catch (err) {
                    // Si hubo un error al escribir, lo devuelvo
                    logger_1.default.error(`ERROR => ${err}`);
                }
            }
            catch (err) {
                // Este catch viene desde el primer try, significa que si entró aquí,
                // o bien no existe el archivo, o bien tiene algún error al leerlo
                // Para el caso que no exista, lo verifico con el código 'ENOENT'
                if (err.code === 'ENOENT') {
                    try {
                        // El archivo no existe, significa que es el primer elemento
                        // Guardo en un array el elemento, y lo escribo en el archivo
                        document.id = (0, uuid_1.v4)();
                        yield fs_1.default.promises.writeFile(filePath, JSON.stringify([document], null, 2));
                        // Devuelvo el nuevo objeto creado
                        return document;
                    }
                    catch (err) {
                        // Si hubo un error al escribir en el archivo, lo devuelvo para usar en la API
                        logger_1.default.error(`ERROR => ${err}`);
                    }
                }
                else {
                    // Devuelvo para mostrar en api si llega a haber algún error distinto al 'ENOENT'
                    return err.message;
                }
            }
        });
    }
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const filePath = path_1.default.resolve(__dirname, this.file);
            try {
                // Intento leer el archivo
                const content = yield fs_1.default.promises.readFile(filePath, 'utf8');
                // Guardo el contenido en un array de objetos
                const info = JSON.parse(content);
                // Con el método findIndex, verifico si existe algún producto con el id buscado
                // No uso la comparación estricta, por si algún id era numérico en la BD y el req.params lo recibe como string
                const index = info.findIndex((item) => item.id == id);
                // Si index = -1, el elemento con ese id no existe
                if (index < 0) {
                    return {
                        error: 'Elemento no encontrado',
                    };
                }
                // Si el producto buscado existe, lo elimino en el array con el método 'splice'
                info.splice(index, 1);
                try {
                    // Intento escribir los datos del nuevo array en el archivo
                    yield fs_1.default.promises.writeFile(filePath, JSON.stringify(info, null, 2));
                    return 1;
                }
                catch (err) {
                    logger_1.default.error(`ERROR => ${err}`);
                }
            }
            catch (err) {
                // Muestro el error en caso de que no haya podido leer el archivo
                logger_1.default.error(`ERROR => ${err}`);
            }
        });
    }
    deleteAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const filePath = path_1.default.resolve(__dirname, this.file);
            try {
                // Intento leer el archivo
                const content = yield fs_1.default.promises.readFile(filePath, 'utf8');
                try {
                    // Intento escribir el nuevo array vacío en el archivo
                    yield fs_1.default.promises.writeFile(filePath, JSON.stringify([], null, 2));
                    return 1;
                }
                catch (err) {
                    logger_1.default.error(`ERROR => ${err}`);
                }
            }
            catch (err) {
                // Muestro el error en caso de que no haya podido leer el archivo
                logger_1.default.error(`ERROR => ${err}`);
            }
        });
    }
    update(id, item) {
        return __awaiter(this, void 0, void 0, function* () {
            const filePath = path_1.default.resolve(__dirname, this.file);
            try {
                // Intento leer el archivo
                const content = yield fs_1.default.promises.readFile(filePath, 'utf8');
                // Guardo el contenido en un array de objetos
                const info = JSON.parse(content);
                // Con el método findIndex, verifico si existe algún producto con el id del objeto que recibe la función por parámetro
                const index = info.findIndex((elem) => item.id === elem.id);
                // Si index = -1, el item con ese id no existe
                if (index < 0) {
                    return {
                        msg: 'Elemento no encontrado',
                    };
                }
                // Si el item buscado existe, lo reemplazo con el nuevo que viene por parámetro
                info.splice(index, 1, item);
                try {
                    // Intento escribir los datos del nuevo array en el archivo
                    yield fs_1.default.promises.writeFile(filePath, JSON.stringify(info, null, 2));
                    return item;
                }
                catch (err) {
                    // Si hubo error al escribir, lo devuelvo a la api
                    logger_1.default.error(`ERROR => ${err}`);
                }
            }
            catch (err) {
                // Devuelvo error a la api en caso de que no haya podido leer el archivo
                logger_1.default.error(`ERROR => ${err}`);
            }
        });
    }
    findOne(field) {
        return __awaiter(this, void 0, void 0, function* () {
            const filePath = path_1.default.resolve(__dirname, this.file);
            try {
                const content = yield fs_1.default.promises.readFile(filePath, 'utf8');
                const info = JSON.parse(content);
                // Con el método 'find' de array, busco el item que tenga el mismo id que el que se busca
                let item = info.find((e) => field.username == e.username);
                if (item)
                    return item;
            }
            catch (err) {
                logger_1.default.error(`ERROR => ${err}`);
            }
        });
    }
}
exports.default = DaoFileSystem;
