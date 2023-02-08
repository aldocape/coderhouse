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
exports.getAllUsers = exports.findOneUser = exports.updateUser = exports.deleteUserById = exports.getUserById = exports.saveUser = void 0;
const persistence_1 = require("../persistence/persistence");
function saveUser(user) {
    return __awaiter(this, void 0, void 0, function* () {
        const newUser = yield (0, persistence_1.save)('user', user);
        return newUser;
    });
}
exports.saveUser = saveUser;
function getUserById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield (0, persistence_1.getById)('user', id);
        return user;
    });
}
exports.getUserById = getUserById;
function deleteUserById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield (0, persistence_1.deleteById)('user', id);
        return user;
    });
}
exports.deleteUserById = deleteUserById;
function updateUser(id, user) {
    return __awaiter(this, void 0, void 0, function* () {
        const userModified = yield (0, persistence_1.update)('user', id, user);
        return userModified;
    });
}
exports.updateUser = updateUser;
function findOneUser(field) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield (0, persistence_1.findOne)('user', field);
        return user;
    });
}
exports.findOneUser = findOneUser;
function getAllUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        const users = yield (0, persistence_1.getAll)('user');
        return users;
    });
}
exports.getAllUsers = getAllUsers;
