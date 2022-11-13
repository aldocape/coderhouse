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
exports.createTableMsg = exports.getAll = exports.add = void 0;
const db_1 = require("../services/db");
const messages_1 = __importDefault(require("../services/messages"));
// Instancio la clase, pasando al constructor el objeto con los datos de configuración de SQLite
// y el nombre de la tabla que va a utilizar
const sql = new messages_1.default(db_1.SQLiteDB, 'messages');
const add = (msg) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield sql.createMessage(msg);
    }
    catch (error) {
        return error.message;
    }
});
exports.add = add;
const getAll = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const messages = yield sql.listMessages();
        return {
            success: true,
            messages,
        };
    }
    catch (error) {
        return {
            success: false,
            msg: error.message,
        };
    }
});
exports.getAll = getAll;
const createTableMsg = () => {
    try {
        sql.createTableMessages().then(() => {
            sql.createMessagesHardcoded().then(() => {
                console.log('Tabla mensajes y datos de prueba, creados con éxito!!');
                return;
            });
        });
    }
    catch (error) {
        return {
            success: false,
            msg: error.message,
        };
    }
};
exports.createTableMsg = createTableMsg;
