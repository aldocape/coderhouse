import passport from 'passport';
import { Router } from 'express';
import { login, signUp, getHome } from '../controllers/user.controllers.js';
import { isLoggedIn } from '../middlewares/user.middleware.js';

const router = Router();

const passportOptions = { badRequestMessage: 'Falta username o password' };

router.post('/signup', signUp);
router.post('/login', passport.authenticate('login', passportOptions), login);
router.get('/home', isLoggedIn, getHome);

export default router;
