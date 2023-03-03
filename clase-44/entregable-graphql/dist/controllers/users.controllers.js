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
exports.signUpFunction = exports.loginFunction = exports.logout = exports.login = exports.updateUserController = exports.getAllUsersController = exports.signup = void 0;
const users_services_1 = require("../services/users.services");
const passport_1 = __importDefault(require("passport"));
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
        const newUser = yield (0, users_services_1.saveUser)({
            username,
            password,
            nombre,
            direccion,
            edad,
            telefono,
            avatar,
            admin: false,
            carrito: new tools_1.ObjectId(),
        });
        return done(null, newUser);
    }
    catch (err) {
        logger_1.default.error(err);
        return done(null, false, { message: 'Error inesperado' });
    }
});
exports.signup = signup;
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
        res.status(500).json({
            error: err.message,
        });
    }
});
exports.getAllUsersController = getAllUsersController;
const updateUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if ((0, tools_1.isValidObjectId)(id)) {
            // Mando al controller toda la data válida que llega desde el middleware
            const user = yield (0, users_services_1.updateUser)(id, req.body);
            res.json(user);
        }
        else {
            res.status(500).json({
                msg: 'El id proporcionado no es un ObjectId válido para MongoDB',
            });
        }
    }
    catch (err) {
        res.status(500).json({
            error: err.message,
        });
    }
});
exports.updateUserController = updateUserController;
const login = (req, username, password, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Busco sólo el username, no la password porque la tengo encriptada
        const user = yield (0, users_services_1.findOneUser)({ username });
        if (!user) {
            return done(null, false, {
                type: 'signUpMessage',
                message: 'El usuario no existe en el sistema',
            });
        }
        else {
            // Si el usuario existe, comparo la password que llega con la de la BD, con el método matchPassword
            const match = yield user.matchPassword(password);
            // const match = await matchPswd(password, user.password);
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
exports.login = login;
const logout = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.user && req.user.username) {
        try {
            const nombre = req.user.nombre;
            req.logout(function (err) {
                if (err) {
                    return next(err);
                }
                if (nombre) {
                    res.render('logout', { nombre });
                }
                else {
                    res.json({
                        status: 'Error en el logout',
                        body: err,
                    });
                }
            });
        }
        catch (err) {
            res.json({
                status: 'Error en el logout',
                body: err,
            });
        }
    }
    else {
        res.render('login', { msg: '' });
    }
});
exports.logout = logout;
// export const sendMail = async (req: any) => {
//   // Usuario creado, armo cuerpo de mensaje y envío de mail
//   const destination = config.GMAIL_EMAIL;
//   const subject = 'Nuevo Registro de Usuario';
//   const content = `
//       <p>Username: ${req.body.username}<br />
//       Nombre y apellido: ${req.body.nombre}<br />
//       Dirección: ${req.body.direccion}<br />
//       Edad: ${req.body.edad}<br />
//       Teléfono: ${req.body.telefono}<br />
//       Avatar: ${req.body.avatar}
//       </p>`;
//   const email = await EmailService.sendEmail(destination, subject, content);
//   return email;
// };
passport_1.default.serializeUser((user, done) => {
    done(null, user._id);
});
passport_1.default.deserializeUser((userId, done) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield (0, users_services_1.getUserById)(userId);
    return done(null, user);
}));
exports.loginFunction = new passport_local_1.Strategy(strategyOptions, exports.login);
exports.signUpFunction = new passport_local_1.Strategy(strategyOptions, exports.signup);
