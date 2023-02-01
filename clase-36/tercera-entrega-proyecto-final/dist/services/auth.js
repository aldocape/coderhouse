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
exports.signUpFunction = exports.loginFunction = void 0;
const passport_1 = __importDefault(require("passport"));
const users_1 = __importDefault(require("../models/users"));
const passport_local_1 = require("passport-local");
const tools_1 = require("../utils/tools");
const logger_1 = __importDefault(require("../middlewares/logger"));
// cambiar el nombre de los campos si llega a ser distinto en la base de datos
// por defecto se puede omitir porque ya viene asignado esos valores
const strategyOptions = {
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true,
};
const signup = (req, username, password, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        logger_1.default.info('Signup ha sido exitoso!');
        const { nombre, direccion, edad, telefono, avatar } = req.body;
        const newUser = new users_1.default({
            username,
            password,
            nombre,
            direccion,
            edad,
            telefono,
            avatar,
            carrito: new tools_1.ObjectId(),
        });
        // const newUser = await UserModel.create({ username, password });
        newUser.password = yield newUser.encryptPassword(password);
        yield newUser.save();
        return done(null, newUser);
    }
    catch (err) {
        logger_1.default.error(err);
        return done(null, false, { message: 'Error inesperado - Clave duplicada' });
    }
});
const login = (req, username, password, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Busco sólo el username, no la password porque la tengo encriptada
        const user = yield users_1.default.findOne({ username });
        if (!user) {
            return done(null, false, {
                type: 'signUpMessage',
                message: 'El usuario no existe en el sistema',
            });
        }
        else {
            // Si el usuario existe, comparo la password que llega con la de la BD, con el método matchPassword
            const match = yield user.matchPassword(password);
            // Si la contraseña es igual a la que está registrada en la clase (desencriptada), devuelve true
            // En ese caso, al método 'done' le pasamos user, sino false por 'no encontrado'
            if (match) {
                logger_1.default.info('Usuario encontrado!');
                return done(null, user);
            }
            else {
                // res.json({ msg: 'Error: La contraseña ingresada es incorrecta' });
                return done(null, false, {
                    type: 'signUpMessage',
                    message: 'La contraseña ingresada es incorrecta',
                });
            }
        }
    }
    catch (err) {
        logger_1.default.error(err);
    }
});
passport_1.default.serializeUser((user, done) => {
    done(null, user._id);
});
passport_1.default.deserializeUser((userId, done) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield users_1.default.findById(userId);
    return done(null, user);
}));
exports.loginFunction = new passport_local_1.Strategy(strategyOptions, login);
exports.signUpFunction = new passport_local_1.Strategy(strategyOptions, signup);
