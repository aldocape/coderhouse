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
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("../../config"));
const logger_1 = __importDefault(require("../../middlewares/logger"));
const tools_1 = require("../../utils/tools");
// Importo modelos para cada una de las colecciones
const messages_1 = __importDefault(require("../../models/messages"));
const products_1 = __importDefault(require("../../models/products"));
const carts_1 = __importDefault(require("../../models/carts"));
const users_1 = __importDefault(require("../../models/users"));
const products_dto_1 = __importDefault(require("../../dto/products.dto"));
const messages_dto_1 = __importDefault(require("../../dto/messages.dto"));
const connectionString = config_1.default.MONGO_ATLAS_URL;
mongoose_1.default.set('strictQuery', false);
class DaoMongoDB {
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
    // Implementación de patrón singleton (únicamente para hacer una única conexión a la BD) porque
    // en realidad necesitamos varias instancias de esta clase para trabajar con las distintas colecciones
    static getInstance(collection) {
        if (!DaoMongoDB.instance) {
            logger_1.default.info('Connecting...');
            // Conexión a la BD de Mongo
            DaoMongoDB.connection = mongoose_1.default.connect(connectionString).then((con) => {
                logger_1.default.info(`Database is connected to: ${con.connection.name}`);
            });
        }
        DaoMongoDB.instance = new DaoMongoDB(collection);
        logger_1.default.info(`Instancia de clase: ${collection} iniciada`);
        return DaoMongoDB.instance;
    }
    disconnectMongo() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                logger_1.default.info('Disconnecting from database...');
                mongoose_1.default.disconnect().then((result) => {
                    logger_1.default.info('Succesful disconnected');
                });
            }
            catch (error) {
                logger_1.default.error(`ERROR => ${error}`);
                return error;
            }
        });
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
                if (documents)
                    switch (this.collection) {
                        case 'product':
                            return documents.map((producto) => new products_dto_1.default(producto, true));
                        case 'message':
                            return documents.map((message) => new messages_dto_1.default(message, true));
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
                logger_1.default.error(`ERROR => ${err}`);
            }
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if ((0, tools_1.isValidObjectId)(id)) {
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
                        if (doc)
                            switch (this.collection) {
                                case 'product':
                                    return new products_dto_1.default(doc, true);
                                case 'message':
                                    return new messages_dto_1.default(doc, true);
                                default:
                                    break;
                            }
                    }
                    return doc;
                }
                else {
                    return {
                        error: true,
                        msg: 'El id proporcionado no es un ObjectId válido para MongoDB',
                    };
                }
            }
            catch (err) {
                logger_1.default.error(`ERROR => ${err}`);
            }
        });
    }
    // Método update actualiza un documento, recibe dos variables por parámetro: el id y el documento modificado
    update(id, obj) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if ((0, tools_1.isValidObjectId)(id)) {
                    const document = yield this.model.findOneAndUpdate({ _id: id }, obj, {
                        new: true,
                    });
                    return document;
                }
                else {
                    return {
                        error: true,
                        msg: 'El id proporcionado no es un ObjectId válido para MongoDB',
                    };
                }
            }
            catch (err) {
                logger_1.default.error(`ERROR => ${err}`);
            }
        });
    }
    findOne(query) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const document = yield this.model.findOne(query);
                return document;
            }
            catch (err) {
                logger_1.default.error(`ERROR => ${err}`);
            }
        });
    }
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if ((0, tools_1.isValidObjectId)(id)) {
                    const document = yield this.model.findByIdAndDelete(id);
                    return document;
                }
                else {
                    return {
                        msg: 'El id proporcionado no es un ObjectId válido para MongoDB',
                    };
                }
            }
            catch (err) {
                logger_1.default.error(`ERROR => ${err}`);
            }
        });
    }
    deleteAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deleted = yield this.model.deleteMany();
                return deleted;
            }
            catch (err) {
                logger_1.default.error(`ERROR => ${err}`);
            }
        });
    }
}
exports.default = DaoMongoDB;
