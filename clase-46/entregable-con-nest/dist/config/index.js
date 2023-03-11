"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = require("dotenv");
dotenv.config();
exports.default = {
    PORT: process.env.PORT || 8080,
    MONGO_ATLAS_SRV: process.env.MONGO_ATLAS_SRV || 'mongosrv',
};
//# sourceMappingURL=index.js.map