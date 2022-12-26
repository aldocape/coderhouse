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
const users_1 = __importDefault(require("../models/users"));
// Clase Users con persistencia de datos en MongoDB
class Users {
    // Método getAll obtiene todos los usuarios
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield users_1.default.find();
            return users;
        });
    }
    login(req, username, password, done) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('Login!!');
                // Busco sólo el username, no la password porque la tengo encriptada
                const user = yield users_1.default.findOne({ username });
                if (!user) {
                    return done(null, false, { msg: 'User not fonud' });
                }
                else {
                    // Si el usuario existe, comparo la password que llega con la de la BD, con el método matchPassword
                    const match = yield user.matchPassword(password);
                    // Si la contraseña es igual a la que está registrada en la clase (desencriptada), devuelve true
                    // En ese caso, al método 'done' le pasamos user, sino false por 'no encontrado'
                    match ? done(null, user) : done(null, false);
                }
                console.log('Usuario encontrado!!');
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    signup(req, username, password, done) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('Signup!');
                const newUser = new users_1.default({ username, password });
                // const newUser = await UserModel.create({ username, password });
                newUser.password = yield newUser.encryptPassword(password);
                yield newUser.save();
                return done(null, newUser);
            }
            catch (err) {
                console.log(err);
                return done(null, false, { message: 'Error inesperado' });
            }
        });
    }
}
const usrInstance = new Users();
// Exporto una instancia de la clase Users
exports.default = usrInstance;
