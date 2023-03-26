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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_controllers_1 = require("../controllers/users.controllers");
const users_services_1 = require("../services/users.services");
const router = (0, express_1.Router)();
// Logout del usuario
// Endpoint: /logout Método: GET
router.get('/logout', users_controllers_1.logout);
// Nuevo registro de usuario
// Endpoint: /register Método: GET
router.get('/register', (req, res) => {
    res.render('register', { msg: '' });
});
router.post('/signup', users_controllers_1.signUpController);
router.post('/login', users_controllers_1.loginController);
router.get('/usuarios', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
}));
exports.default = router;
