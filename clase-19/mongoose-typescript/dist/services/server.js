"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = __importDefault(require("../routes/index"));
// import http from 'http';
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/api', index_1.default);
app.use('/', (req, res) => {
    res.send('Estamos ready');
});
const errorHandlerFunction = (err, req, res, next) => {
    return res.status(500).json({
        msg: 'There was an unexpected error',
        error: err.message,
    });
};
app.use(errorHandlerFunction);
// const httpServer = new http.Server(app);
exports.default = app;
