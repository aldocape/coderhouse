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
const knex_1 = __importDefault(require("knex"));
class SQLClient {
    // Recibo en el constructor el objeto de configuración de knex y
    // el nombre de la tabla sobre la cual trabajará
    constructor(config, table) {
        this.knex = knex_1.default(config);
        this.table = table;
    }
    createTableMessages() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.knex.schema.dropTableIfExists(this.table);
            yield this.knex.schema.createTable(this.table, (table) => {
                table.increments('id').primary();
                table.string('time', 50).notNullable();
                table.string('user', 100).notNullable();
                table.string('text', 400).notNullable();
            });
        });
    }
    createMessagesHardcoded() {
        return __awaiter(this, void 0, void 0, function* () {
            const messages = [
                {
                    time: '31/01/2021 12:26:47',
                    user: 'pedro@gmail.com',
                    text: 'Hola!',
                },
                {
                    time: '31/01/2021 12:28:00',
                    user: 'lucia@hotmail.com',
                    text: 'Qué tal?',
                },
                {
                    time: '31/01/2021 12:28:40',
                    user: 'diego@outlook.com',
                    text: 'Cómo están todos?',
                },
            ];
            return yield this.knex(this.table).insert(messages);
        });
    }
    listMessages() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.knex(this.table).select('*');
        });
    }
    createMessage(message) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.knex(this.table).insert(message);
        });
    }
    close() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.knex.destroy();
        });
    }
}
exports.default = SQLClient;
