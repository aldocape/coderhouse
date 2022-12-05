"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = exports.usersCollection = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.usersCollection = 'usuario';
const userSchema = new mongoose_1.default.Schema({
    name: { type: String, require: true, max: 100 },
    username: { type: String, require: true, max: 100 },
    password: { type: String, require: true },
    admin: { type: Boolean, default: false },
}, { timestamps: true });
exports.UserModel = mongoose_1.default.model(exports.usersCollection, userSchema);
