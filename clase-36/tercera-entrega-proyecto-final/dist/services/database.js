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
exports.disconnectMongo = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("../config"));
const logger_1 = __importDefault(require("../middlewares/logger"));
const connectionString = config_1.default.MONGO_ATLAS_URL;
// Conexión a la BD de Mongo
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        logger_1.default.info('Connecting...');
        mongoose_1.default.set('strictQuery', false);
        const db = yield mongoose_1.default.connect(connectionString);
        logger_1.default.info(`Database is connected to: ${db.connection.name}`);
    }
    catch (error) {
        logger_1.default.error(`ERROR => ${error}`);
    }
}))();
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
