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
exports.disconnectMongoDB = exports.initMongoDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const connectionString = process.env.MONGO_ATLAS_SRV ||
    'mongodb://admin:123456@localhost:27017/ecommerce?authSource=ecommerce';
// mongodb+srv://aldocape:h3r4cl3s@cluster0.rhuhd.mongodb.net/?retryWrites=true&w=majority
// mongodb+srv://admin:wH36iV422HeSthLy@cluster0.rhuhd.mongodb.net/test
// mongodb+srv://aldocape:h3r4cl3s@cluster0.rhuhd.mongodb.net/eshop-database
const initMongoDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('CONECTANDO A MI DB');
        yield mongoose_1.default.connect(connectionString, {
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
        });
        console.log('YA ESTOY CONECTADO');
    }
    catch (error) {
        console.log(`ERROR => ${error}`);
        return error;
    }
});
exports.initMongoDB = initMongoDB;
const disconnectMongoDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('DESCONECTANDO DE MI DB');
        yield mongoose_1.default.disconnect();
        console.log('DESCONEXION OK');
    }
    catch (error) {
        console.log(`ERROR => ${error}`);
        return error;
    }
});
exports.disconnectMongoDB = disconnectMongoDB;
