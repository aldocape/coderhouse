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
const logger_1 = __importDefault(require("../../middlewares/logger"));
const uuid_1 = require("uuid");
const products_dto_1 = __importDefault(require("../../dto/products.dto"));
const messages_dto_1 = __importDefault(require("../../dto/messages.dto"));
const products = [
    {
        id: 'cc31e62d-d874-4278-94c1-aefc46989a0a',
        nombre: 'Protector Solar para niños',
        descripcion: 'Protector factor 50',
        foto: 'https://http2.mlstatic.com/D_NQ_NP_708632-MLA52162580244_102022-O.webp',
        codigo: '935984321',
        precio: 1574,
        stock: 50,
    },
    {
        id: 'a8d94e59-8b02-4e39-b382-f6a75343326d',
        nombre: 'Tablet Philco',
        descripcion: 'Tp10a332 10.1 Ips 32gb 2gb Android 11 Con Funda',
        foto: 'https://http2.mlstatic.com/D_NQ_NP_886369-MLA52088853536_102022-O.webp',
        codigo: '498261984',
        precio: 30799,
        stock: 10,
    },
];
const messages = [
    {
        author: {
            email: 'aldocape@gmail.com',
            nombre: 'Aldo',
            apellido: 'Capezzali',
            edad: 40,
            alias: '',
            avatar: '',
        },
        text: 'holaaa',
        time: '12/02/2023 07:57:09',
        id: '3e1e894e-a707-47ba-bbe3-0252371bc80a',
    },
    {
        author: {
            email: 'aldocape@gmail.com',
            nombre: '',
            apellido: '',
            edad: '',
            alias: '',
            avatar: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1101.jpg',
        },
        text: 'hola ahi va otro mensaje',
        time: '12/02/2023 09:08:32',
        id: '7967fc31-63cb-495d-b446-a48f9c85c424',
    },
];
const carts = [];
class DaoMemory {
    constructor(collection) {
        this.collection = collection;
        switch (collection) {
            case 'product':
                this.recurso = products;
                break;
            case 'cart':
                this.recurso = carts;
                break;
            case 'message':
                this.recurso = messages;
                break;
            default:
                break;
        }
    }
    static getInstance(collection) {
        DaoMemory.instance = new DaoMemory(collection);
        logger_1.default.info(`Instancia de clase: ${collection} iniciada`);
        return DaoMemory.instance;
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const items = this.recurso;
                if (items.length)
                    switch (this.collection) {
                        case 'product':
                            return items.map((producto) => new products_dto_1.default(producto, false));
                        case 'message':
                            return items.map((message) => new messages_dto_1.default(message, false));
                        default:
                            break;
                    }
                return items;
            }
            catch (err) {
                logger_1.default.error(`ERROR => ${err}`);
            }
        });
    }
    save(document) {
        return __awaiter(this, void 0, void 0, function* () {
            document.id = (0, uuid_1.v4)();
            this.recurso.push(document);
            return document;
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const item = this.recurso.find((e) => id === e.id);
                if (item)
                    return item;
                return 0;
            }
            catch (err) {
                logger_1.default.error(`ERROR => ${err}`);
            }
        });
    }
    update(id, item) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const index = this.recurso.findIndex((elem) => id === elem.id);
                if (index < 0)
                    return 0;
                // Si el item buscado existe, lo reemplazo con el nuevo que viene por parámetro
                this.recurso.splice(index, 1, item);
                // Devuelvo el elemento modificado
                return item;
            }
            catch (err) {
                // Devuelvo error a la api en caso de que no haya podido leer el archivo
                logger_1.default.error(`ERROR => ${err}`);
            }
        });
    }
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const index = this.recurso.findIndex((elem) => id === elem.id);
                if (index < 0)
                    return 0;
                return this.recurso.splice(index, 1);
            }
            catch (err) {
                // Devuelvo error a la api en caso de que no haya podido leer el archivo
                logger_1.default.error(`ERROR => ${err}`);
            }
        });
    }
    deleteAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deleted = this.recurso.splice(0, this.recurso.length);
                return deleted;
            }
            catch (err) {
                // Devuelvo error a la api en caso de que no haya podido leer el archivo
                logger_1.default.error(`ERROR => ${err}`);
            }
        });
    }
}
exports.default = DaoMemory;
