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
// Importo cookie parser para almacaner cookie de sesión en el browser del cliente
const cookie_parser_1 = __importDefault(require("cookie-parser"));
// Importo express session y connect-mongo para almacenar las sesiones en Mongo Atlas
const express_session_1 = __importDefault(require("express-session"));
const connect_mongo_1 = __importDefault(require("connect-mongo"));
// Importo passport para uso de passport local para gestión de datos de usuario en la sesión
const passport_1 = __importDefault(require("passport"));
const express_1 = require("express");
const logger_1 = __importDefault(require("../middlewares/logger"));
// Uso librería connect-flash para poder mostrar en el front los mensajes que manda el callback de passport.authenticate
const connect_flash_1 = __importDefault(require("connect-flash"));
// Importo middleware de autenticación de usuario autorizado
const auth_1 = __importDefault(require("../middlewares/auth"));
// Importo función middleware que verifica que el usuario esté logueado
const user_1 = require("../middlewares/user");
const config_1 = __importDefault(require("../config"));
const users_controllers_1 = require("../controllers/users.controllers");
const router = (0, express_1.Router)();
// Cantidad de segundos en los que expira la sesión
const ttlSeconds = 600; // 600 seg = 10 minutos
const mongoUrl = config_1.default.MONGO_ATLAS_URL;
// Parámetros de almacenamiento de la sesión en Mongo Atlas
// Pongo resave:true porque sino da un error
// Error: Unable to find the session to touch
const storeOptions = {
    store: connect_mongo_1.default.create({
        mongoUrl,
        crypto: {
            secret: 'abejita',
        },
    }),
    secret: 'MiClaveSuperSecreta',
    resave: true,
    saveUninitialized: false,
    cookie: {
        maxAge: ttlSeconds * 1000,
    },
};
const passportOptions = {
    badRequestMessage: 'Falta username o password',
    failureRedirect: '/login',
    failureFlash: true,
};
router.use((0, cookie_parser_1.default)());
router.use((0, express_session_1.default)(storeOptions));
router.use(passport_1.default.initialize());
router.use(passport_1.default.session());
passport_1.default.use('login', users_controllers_1.loginFunction);
passport_1.default.use('signup', users_controllers_1.signUpFunction);
router.use((0, connect_flash_1.default)());
// La ruta '/home' sólo es accesible si el usuario está logueado, mediante el uso de middleware 'isLoggedIn'
// Debe ir necesariamente en el router de usuario porque 'isLoggedIn' necesita verificar
// con la función 'isAuthenticated()' que depende de passport que está implementado en esta sección
router.get('/home', user_1.isLoggedIn, (req, res) => {
    if (req.user && req.user.username) {
        const { nombre, username, direccion, avatar, id, carrito } = req.user;
        res.render('index', {
            nombre,
            username,
            direccion,
            avatar,
            user_id: id,
            carrito_id: carrito,
        });
    }
});
// Login del usuario - Verifico usuario válido
// Endpoint: /login Método: POST
router.post('/login', passport_1.default.authenticate('login', passportOptions), (req, res) => {
    try {
        if (req.user) {
            res.redirect('/home');
        }
        else {
            res.render('login', { msg: 'Error al ingresar' });
        }
    }
    catch (err) {
        console.log(err);
    }
});
// Carga de nuevo usuario y envío de mail al administrador
// Endpoint: /signup Método: POST
router.post('/signup', (req, res, next) => {
    try {
        passport_1.default.authenticate('signup', passportOptions, (err, user, info) => __awaiter(void 0, void 0, void 0, function* () {
            if (err) {
                return next(err);
            }
            if (!user) {
                return res.status(401).json(info);
            }
            // envio de mail (descomentar en caso de tener cargadas las credenciales como variables de entorno)
            // await sendMail(req);
            res.render('login', {
                msg: 'Usuario creado con éxito - Ya puede ingresar al sitio con sus datos de acceso',
            });
        }))(req, res, next);
    }
    catch (err) {
        console.log(err);
    }
});
// Recibe un id y actualiza un usuario, en caso de existir
// Endpoint: /api/usuarios/:id Método: PUT
router.put('/api/usuarios/:id', auth_1.default, users_controllers_1.updateUserController);
// Devuelvo todos los usuarios
// Endpoint: /api/usuarios/ Método: GET
router.get('/api/usuarios', auth_1.default, users_controllers_1.getAllUsersController);
// Muestra formulario de login, y un mensaje en caso de corresponder
// Endpoint: /login Método: GET
router.get('/login', (req, res) => {
    logger_1.default.info(`Process PID: '${process.pid}'`);
    res.render('login', { msg: req.flash('signUpMessage') });
});
// Logout del usuario
// Endpoint: /logout Método: GET
router.get('/logout', users_controllers_1.logout);
// Nuevo registro de usuario
// Endpoint: /register Método: GET
router.get('/register', (req, res) => {
    res.render('register', { msg: '' });
});
exports.default = router;
