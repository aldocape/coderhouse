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
exports.checkAuth = exports.generateAuthToken = void 0;
const config_1 = __importDefault(require("../config"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const users_services_1 = require("../services/users.services");
const generateAuthToken = (user) => {
    const payload = {
        userId: user._id,
        nombre: user.nombre,
        username: user.username,
        admin: user.admin,
    };
    //get the private key from the config file -> environment variable
    const token = jsonwebtoken_1.default.sign(payload, config_1.default.TOKEN_SECRET_KEY, {
        expiresIn: '1h', //poner '1m' para 1 minuto
    });
    return token;
};
exports.generateAuthToken = generateAuthToken;
const checkAuth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    //get the token from the header if present
    const authHeader = req.headers.authorization;
    if (!authHeader)
        return res.status(401).json({ msg: 'Unauthorized' });
    else
        try {
            console.log(authHeader);
            const [bearer, jswtoken] = authHeader.split(' ');
            // const decode = jwt.verify(token, Config.TOKEN_SECRET_KEY);
            const decode = jsonwebtoken_1.default.verify(jswtoken, config_1.default.TOKEN_SECRET_KEY);
            console.log('TOKEN DECODIFICADO');
            const user = yield (0, users_services_1.getUserById)(decode.userId);
            if (!user)
                return res.status(400).json({ msg: 'Unauthorized' });
            // req.session = session;
            next();
        }
        catch (err) {
            console.log(err);
            return res.status(401).json({ msg: 'Unauthorized' });
        }
});
exports.checkAuth = checkAuth;
