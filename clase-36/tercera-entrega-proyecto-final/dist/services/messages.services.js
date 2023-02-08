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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllDenormalized = exports.getAllNormalized = exports.getAllMessages = exports.saveMessage = void 0;
const persistence_1 = require("../persistence/persistence");
// Importo métodos de librería normalizr para normalizar lo que llega de la BD
const normalizr_1 = require("normalizr");
const author = new normalizr_1.schema.Entity('author', {}, {
    idAttribute: 'email',
});
const message = new normalizr_1.schema.Entity('message', { author: author }, {
    idAttribute: '_id',
});
const finalSchema = [message];
function saveMessage(message) {
    return __awaiter(this, void 0, void 0, function* () {
        const msg = yield (0, persistence_1.save)('message', message);
        return msg;
    });
}
exports.saveMessage = saveMessage;
function getAllMessages() {
    return __awaiter(this, void 0, void 0, function* () {
        const messages = yield (0, persistence_1.getAll)('message');
        return messages;
    });
}
exports.getAllMessages = getAllMessages;
function getAllNormalized() {
    return __awaiter(this, void 0, void 0, function* () {
        const messages = yield (0, persistence_1.getAll)('message');
        const normalizedData = (0, normalizr_1.normalize)(messages, finalSchema);
        return {
            messages: normalizedData,
        };
    });
}
exports.getAllNormalized = getAllNormalized;
function getAllDenormalized() {
    return __awaiter(this, void 0, void 0, function* () {
        const normalized = yield getAllNormalized();
        const denormalizedData = (0, normalizr_1.denormalize)(normalized.result, finalSchema, normalized.entities);
        return {
            messages: denormalizedData,
        };
    });
}
exports.getAllDenormalized = getAllDenormalized;
