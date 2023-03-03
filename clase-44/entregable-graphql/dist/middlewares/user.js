"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isLoggedIn = void 0;
const isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated())
        next();
    else
        res.redirect('/login');
};
exports.isLoggedIn = isLoggedIn;
