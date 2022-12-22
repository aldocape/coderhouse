"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isLoggedIn = void 0;
const isLoggedIn = (req, res, next) => {
    console.log(req.isAuthenticated());
    if (req.isAuthenticated())
        next();
    else
        res.redirect('/login');
};
exports.isLoggedIn = isLoggedIn;
