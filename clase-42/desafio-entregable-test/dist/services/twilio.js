"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.twilioClient = void 0;
const twilio_1 = __importDefault(require("twilio"));
const config_1 = __importDefault(require("../config"));
exports.twilioClient = (0, twilio_1.default)(config_1.default.SID, config_1.default.TOKEN);
