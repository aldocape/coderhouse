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
const mongoose_1 = require("mongoose");
const carts_1 = require("./carts");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const usersCollection = 'user';
const collection = carts_1.cartsCollection;
const userSchema = new mongoose_1.Schema({
    username: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    admin: { type: Boolean, require: false },
    nombre: { type: String, require: true },
    direccion: { type: String, require: true },
    edad: { type: Number, require: true },
    telefono: { type: String, require: true },
    avatar: { type: String, require: true },
    carrito: { type: mongoose_1.Schema.Types.ObjectId, ref: collection, required: false },
}, { timestamps: false, versionKey: false });
userSchema.method('encryptPassword', (password) => __awaiter(void 0, void 0, void 0, function* () {
    const salt = yield bcryptjs_1.default.genSalt(10);
    return yield bcryptjs_1.default.hash(password, salt);
}));
userSchema.method('matchPassword', function (password) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcryptjs_1.default.compare(password, this.password);
    });
});
exports.default = (0, mongoose_1.model)(usersCollection, userSchema);
