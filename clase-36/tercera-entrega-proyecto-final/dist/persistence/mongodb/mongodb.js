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
exports.disconnectMongo = exports.initMongoDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("../../config"));
const logger_1 = __importDefault(require("../../middlewares/logger"));
// Importo modelos para cada una de las colecciones
const messages_1 = __importDefault(require("../../models/messages"));
const products_1 = __importDefault(require("../../models/products"));
const carts_1 = __importDefault(require("../../models/carts"));
const users_1 = __importDefault(require("../../models/users"));
const connectionString = config_1.default.MONGO_ATLAS_URL;
// Conexión a la BD de Mongo
const initMongoDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        logger_1.default.info('Connecting...');
        mongoose_1.default.set('strictQuery', false);
        const db = yield mongoose_1.default.connect(connectionString);
        logger_1.default.info(`Database is connected to: ${db.connection.name}`);
    }
    catch (error) {
        logger_1.default.error(`ERROR => ${error}`);
    }
});
exports.initMongoDB = initMongoDB;
// Desconexión de la BD de Mongo
const disconnectMongo = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        logger_1.default.info('Disconnecting from database...');
        yield mongoose_1.default.disconnect();
        logger_1.default.info('Succesful disconnected');
    }
    catch (error) {
        logger_1.default.error(`ERROR => ${error}`);
        return error;
    }
});
exports.disconnectMongo = disconnectMongo;
class MongoDB {
    constructor(collection) {
        this.collection = collection;
        switch (collection) {
            case 'product':
                this.model = products_1.default;
                break;
            case 'cart':
                this.model = carts_1.default;
                break;
            case 'message':
                this.model = messages_1.default;
                break;
            case 'user':
                this.model = users_1.default;
                break;
            default:
                break;
        }
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let documents;
                if (this.collection === 'message') {
                    // Para la colección de mensajes, utilizo lean para que lo devuelva
                    // como objeto simple, plano, y de esa manera poder hacer luego la normalización
                    documents = yield this.model.find().lean();
                }
                else {
                    documents = yield this.model.find();
                }
                return documents;
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    save(document) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let newObject;
                // Hago un condicional especial para usar el método 'encryptPassword' que sólo está
                // en el esquema de usuario
                if (this.collection === 'user') {
                    const newUser = new users_1.default(document);
                    newUser.password = yield newUser.encryptPassword(document.password);
                    newObject = yield newUser.save();
                }
                else {
                    // En el resto de las colecciones, hago la operación habitual de guardado
                    newObject = yield this.model.create(document);
                }
                return newObject;
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let doc;
                // Pregunto si estoy en la colección de carrito para poder traerlo con toda la info
                // de sus productos los cuales obtengo con 'populate'
                if (this.collection === 'cart') {
                    doc = yield this.model.findById(id).populate({
                        path: 'productos',
                    });
                }
                else {
                    doc = yield this.model.findById(id);
                }
                return doc;
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const document = yield this.model.findByIdAndDelete(id);
                return document;
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    // Método update actualiza un documento, recibe dos variables por parámetro: el id y el documento modificado
    update(id, obj) {
        return __awaiter(this, void 0, void 0, function* () {
            // Actualizo el documento usando `updateOne()`
            yield this.model.updateOne({ _id: id }, obj);
            // Cargo el documento para ver los nuevos valores
            const updatedDocument = yield this.model.findOne();
            return updatedDocument;
        });
    }
    findOne(field) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const document = yield this.model.findOne(field);
                return document;
            }
            catch (err) {
                console.log(err);
            }
        });
    }
}
exports.default = MongoDB;
