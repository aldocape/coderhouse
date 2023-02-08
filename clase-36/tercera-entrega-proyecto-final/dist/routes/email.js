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
const email_1 = require("../services/email");
const router = (0, express_1.Router)();
router.post('/send-email', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    if (!body || !body.dest || !body.subject || !body.content)
        return res.status(400).json({
            msg: "Falta enviar en el body los siguientes datos: 'dest', 'subject' y 'content'",
            body,
        });
    const destination = body.dest;
    const subject = body.subject;
    const content = body.content;
    try {
        const response = yield email_1.EmailService.sendEmail(destination, subject, content);
        res.json(response);
    }
    catch (err) {
        res.status(500).json(err);
    }
}));
exports.default = router;
