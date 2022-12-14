"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.get('/', (req, res) => {
    console.log(`PID => ${process.pid} will answer`);
    res.json({
        pid: process.pid,
        msg: 'HOLA',
    });
});
app.get('/slow', function (req, res) {
    console.log(`PID => ${process.pid} will work slow`);
    let sum = 0;
    for (let i = 0; i < 6e9; i++) {
        sum += i;
    }
    res.json({
        pid: process.pid,
        sum,
    });
});
app.get('/muerte', (req, res) => {
    const { code } = req.query;
    res.json({ msg: 'OK' });
    console.log(`PID => ${process.pid} will die`);
    process.exit(code ? Number(code) : 0);
});
exports.default = app;
