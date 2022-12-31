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
const messages_1 = __importDefault(require("../models/messages"));
// Importo métodos de librería normalizr para normalizar lo que llega de la BD
const normalizr_1 = require("normalizr");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const inputPath = path_1.default.resolve(__dirname, '../../messages.json');
const normalizedPath = path_1.default.resolve(__dirname, '../../messagesNormalized.json');
const desnormalizedPath = path_1.default.resolve(__dirname, '../../messagesdesNormalized.json');
const author = new normalizr_1.schema.Entity('author', {}, {
    idAttribute: 'email',
});
const message = new normalizr_1.schema.Entity('message', { author: author }, {
    idAttribute: '_id',
});
const finalSchema = [message];
// Clase Messages con persistencia de datos en MongoDB
class Messages {
    // Método getAll obtiene todos los mensajes
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            //El lean es para indicar que queremos como respuesta un objeto simple
            const messages = yield messages_1.default.find().lean();
            let contenido = JSON.stringify(messages, null, '\t');
            yield fs_1.default.promises.writeFile(inputPath, contenido);
            return {
                messages,
                tamanio: contenido.length,
            };
        });
    }
    // Método 'add' agrega un documento de tipo producto a la colección 'products'
    add(message) {
        return __awaiter(this, void 0, void 0, function* () {
            const newMessage = yield messages_1.default.create(message);
            return newMessage;
        });
    }
    getAllNormalized() {
        return __awaiter(this, void 0, void 0, function* () {
            //El lean es para indicar que queremos como respuesta un objeto simple
            const messages = yield messages_1.default.find().lean();
            const normalizedData = (0, normalizr_1.normalize)(messages, finalSchema);
            let contenido = JSON.stringify(normalizedData, null, '\t');
            yield fs_1.default.promises.writeFile(normalizedPath, contenido);
            const dataOriginal = yield fs_1.default.promises.readFile(inputPath, 'utf-8');
            return {
                messages: normalizedData,
                tamanio: contenido.length,
                tamanioOriginal: dataOriginal.length,
            };
        });
    }
    getAllDenormalized() {
        return __awaiter(this, void 0, void 0, function* () {
            //El lean es para indicar que queremos como respuesta un objeto simple
            const data = yield fs_1.default.promises.readFile(normalizedPath, 'utf-8');
            const normalized = JSON.parse(data);
            const denormalizedData = (0, normalizr_1.denormalize)(normalized.result, finalSchema, normalized.entities);
            let contenido = JSON.stringify(denormalizedData, null, '\t');
            yield fs_1.default.promises.writeFile(desnormalizedPath, contenido);
            return {
                messages: denormalizedData,
                tamanio: contenido.length,
            };
        });
    }
}
const msgInstance = new Messages();
// Exporto una instancia de la clase Products
exports.default = msgInstance;
