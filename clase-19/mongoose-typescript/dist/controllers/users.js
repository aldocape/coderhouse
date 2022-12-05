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
exports.createUser = exports.getAllUsers = void 0;
const users_1 = require("../models/users");
const getAllUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //   const { categoryId } = req.query;
        //   const query : QueryProducts = {};
        //   if(categoryId && typeof categoryId == 'string')
        //     query.categoryId = categoryId;
        // const users = await UserModel.find(
        //   { admin: true },
        //   { name: true, username: true, _id: false }
        // );
        const users = yield users_1.UserModel.find();
        res.json({
            data: users,
        });
    }
    catch (err) {
        if (err instanceof Error)
            res.status(500).json({
                error: err.message,
                stack: err.stack,
            });
        else
            next(err);
    }
});
exports.getAllUsers = getAllUsers;
const createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, username, password, admin } = req.body;
        // const user = {
        //   name: 'Aldo Capezzali',
        //   username: 'aldocape',
        //   password: '123456',
        //   admin: true,
        // };
        const estudiantes = [
            {
                nombre: 'Pedro',
                apellido: 'Mei',
                edad: 21,
                dni: '31155898',
                curso: '1A',
                nota: 7,
            },
            {
                nombre: 'Ana',
                apellido: 'Gonzalez',
                edad: 32,
                dni: '27651878',
                curso: '1A',
                nota: 8,
            },
            {
                nombre: 'José',
                apellido: 'Picos',
                edad: 29,
                dni: '34554398',
                curso: '2A',
                nota: 6,
            },
            {
                nombre: 'Lucas',
                apellido: 'Blanco',
                edad: 22,
                dni: '30355874',
                curso: '3A',
                nota: 10,
            },
            {
                nombre: 'María',
                apellido: 'García',
                edad: 36,
                dni: '29575148',
                curso: '1A',
                nota: 9,
            },
            {
                nombre: 'Federico',
                apellido: 'Perez',
                edad: 41,
                dni: '320118321',
                curso: '2A',
                nota: 5,
            },
            {
                nombre: 'Tomas',
                apellido: 'Sierra',
                edad: 19,
                dni: '38654790',
                curso: '2B',
                nota: 4,
            },
            {
                nombre: 'Carlos',
                apellido: 'Fernández',
                edad: 33,
                dni: '26935670',
                curso: '3B',
                nota: 2,
            },
            {
                nombre: 'Fabio',
                apellido: 'Pieres',
                edad: 39,
                dni: '4315388',
                curso: '1B',
                nota: 9,
            },
            {
                nombre: 'Daniel',
                apellido: 'Gallo',
                edad: 25,
                dni: '37923460',
                curso: '3B',
                nota: 2,
            },
        ];
        const newUser = yield users_1.UserModel.create({
            name,
            username,
            password,
            admin,
        });
        res.json({
            data: newUser,
        });
    }
    catch (err) {
        if (err instanceof Error)
            res.status(500).json({
                error: err.message,
                stack: err.stack,
            });
        else
            next(err);
    }
});
exports.createUser = createUser;
