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
exports.logout = exports.getAllUsersController = exports.loginController = exports.signUpController = void 0;
const users_services_1 = require("../services/users.services");
const auth_jwt_1 = require("../utils/auth_jwt");
const tools_1 = require("../utils/tools");
const logger_1 = __importDefault(require("../middlewares/logger"));
const signUpController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre, direccion, edad, telefono, avatar, username, password, password2, admin, } = req.body;
    if (!username || !password || !password2 || !nombre || !direccion)
        return res
            .status(400)
            .json({ msg: 'Complete todos los campos obligatorios' });
    const user = yield (0, users_services_1.findOneUser)({ username });
    if (user)
        return res.status(400).json({ msg: 'Error: El E-Mail ya existe' });
    const newUser = yield (0, users_services_1.saveUser)({
        username,
        password,
        nombre,
        direccion,
        edad,
        telefono,
        avatar,
        admin,
        carrito: new tools_1.ObjectId(),
    });
    const token = (0, auth_jwt_1.generateAuthToken)(newUser);
    logger_1.default.info('Signup ha sido exitoso!');
    res.header('authentication', `Bearer ${token}`).json({
        msg: 'signup OK',
    });
});
exports.signUpController = signUpController;
const loginController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let { username, password } = req.body;
    try {
        const user = yield (0, users_services_1.findOneUser)({ username });
        if (!user) {
            return res.status(401).json({ msg: 'Invalid Username/Password' });
        }
        else {
            // Si el usuario existe, comparo la password que llega con la de la BD, con el método matchPassword
            const match = yield user.matchPassword(password);
            // Si la contraseña es igual a la que está registrada en la clase (desencriptada), devuelve true
            if (match) {
                // logger.info('Usuario encontrado!');
                console.log('Usuario encontrado');
                const token = (0, auth_jwt_1.generateAuthToken)(user);
                res.header('authorization', `Bearer ${token}`).json({
                    token,
                    status: 'Usuario logueado',
                });
            }
            else {
                res.json({
                    status: 'error',
                    error: 'El usuario o la contraseña son incorrectos',
                });
            }
        }
    }
    catch (err) {
        logger_1.default.error(err);
    }
});
exports.loginController = loginController;
const getAllUsersController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield (0, users_services_1.getAllUsers)();
        if (users) {
            res.json(users);
        }
        else {
            res.status(400).json({
                msg: 'Hubo un error al obtener los usuarios',
            });
        }
    }
    catch (err) {
        res.status(400).json({
            error: err.message,
        });
    }
});
exports.getAllUsersController = getAllUsersController;
const logout = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.session);
    res.render('logout', { nombre: 'Aldo' });
    // if (req.user && req.user.username) {
    // try {
    //   const nombre = req.user.nombre;
    //   req.logout(function (err: any) {
    //     if (err) {
    //       return next(err);
    //     }
    //     if (nombre) {
    //       res.render('logout', { nombre: 'Aldo' });
    //     } else {
    //       res.json({
    //         status: 'Error en el logout',
    //         body: err,
    //       });
    //     }
    //   });
    // } catch (err) {
    //   res.json({
    //     status: 'Error en el logout',
    //     body: err,
    //   });
    // }
    // } else {
    //   res.render('index');
    // }
});
exports.logout = logout;
