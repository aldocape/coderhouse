"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidObjectId = exports.ObjectId = exports.HttpException = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
class HttpException extends Error {
    constructor(status, message) {
        super(message);
        this.status = status;
        this.message = message;
    }
}
exports.HttpException = HttpException;
exports.ObjectId = mongoose_1.default.Types.ObjectId;
// Función para validar que un ObjectId sea válido
function isValidObjectId(id) {
    if (exports.ObjectId.isValid(id)) {
        if (String(new exports.ObjectId(id)) === id)
            return true;
        return false;
    }
    return false;
}
exports.isValidObjectId = isValidObjectId;
