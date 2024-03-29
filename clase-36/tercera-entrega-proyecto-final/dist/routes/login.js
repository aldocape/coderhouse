"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Importo cookie parser para almacaner cookie de sesión en el browser del cliente
const cookie_parser_1 = __importDefault(require("cookie-parser"));
// Importo express session y connect-mongo para almacenar las sesiones en Mongo Atlas
const express_session_1 = __importDefault(require("express-session"));
const connect_mongo_1 = __importDefault(require("connect-mongo"));
const auth_1 = require("../services/auth");
const passport_1 = __importDefault(require("passport"));
const express_1 = require("express");
const user_1 = require("../middlewares/user");
const logger_1 = __importDefault(require("../middlewares/logger"));
const email_1 = require("../services/email");
// Uso librería connect-flash para poder mostrar en el front los mensajes que manda el callback de passport.authenticate
const connect_flash_1 = __importDefault(require("connect-flash"));
const config_1 = __importDefault(require("../config"));
const loginRouter = (0, express_1.Router)();
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
loginRouter.use((0, cookie_parser_1.default)());
loginRouter.use((0, express_session_1.default)(storeOptions));
loginRouter.use(passport_1.default.initialize());
loginRouter.use(passport_1.default.session());
passport_1.default.use('login', auth_1.loginFunction);
passport_1.default.use('signup', auth_1.signUpFunction);
loginRouter.use((0, connect_flash_1.default)());
loginRouter.get('/home', user_1.isLoggedIn, (req, res) => {
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
// La ruta raíz redirecciona a /home para poder hacer la verificación de usuario logueado
loginRouter.get('/', (req, res) => {
    res.redirect('/home');
});
loginRouter.post('/login', passport_1.default.authenticate('login', passportOptions), (req, res) => {
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
loginRouter.post('/signup', (req, res, next) => {
    try {
        passport_1.default.authenticate('signup', passportOptions, (err, user, info) => {
            if (err) {
                return next(err);
            }
            if (!user) {
                return res.status(401).json(info);
            }
            // Usuario creado, envío mail
            const destination = config_1.default.GMAIL_EMAIL;
            const subject = 'Nuevo Registro de Usuario';
            const content = `
        <p>Username: ${req.body.username}<br />
        Nombre y apellido: ${req.body.nombre}<br />
        Dirección: ${req.body.direccion}<br />
        Edad: ${req.body.edad}<br />
        Teléfono: ${req.body.telefono}<br />
        Avatar: ${req.body.avatar}
        </p>`;
            email_1.EmailService.sendEmail(destination, subject, content).then((response) => {
                res.render('login', {
                    msg: 'Usuario creado con éxito - Ya puede ingresar al sitio con sus datos de acceso',
                });
            });
        })(req, res, next);
    }
    catch (err) {
        console.log(err);
    }
});
loginRouter.get('/login', (req, res) => {
    logger_1.default.info(`Process PID: '${process.pid}'`);
    res.render('login', { msg: req.flash('signUpMessage') });
});
loginRouter.get('/logout', (req, res, next) => {
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
loginRouter.get('/register', (req, res) => {
    res.render('register', { msg: '' });
});
exports.default = loginRouter;
