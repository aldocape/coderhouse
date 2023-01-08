import passport from 'passport';
import { Router } from 'express';
import { ensureLoggedIn } from 'connect-ensure-login';

const router = Router();

router.get('/login', (req, res) => {
  res.render('login');
});

router.get('/google', passport.authenticate('google'));

router.get(
  '/oauth2/redirect/accounts.google.com',
  passport.authenticate('google', {
    assignProperty: 'User',
    failureRedirect: '/login',
  }),

  (req, res, next) => {
    console.log(req.User);
    const user = {
      displayName: req.User.displayName,
      //   photo: req.User.photo,
      photo: req.User.photos[0].value,
    };
    req.login(user, (err) => {
      if (err) {
        return next(err);
      } else {
        res.redirect('/');
      }
    });
  }
);

router.get('/', ensureLoggedIn(), (req, res) => {
  res.send(`
              <h1>Nombre: ${req.user.displayName}</h1> <img src="${req.user.photo}" /> <a href="/logout" >Logout</a>
              `);
  console.log(req.sessionID);
  console.log(req.session);
  console.log(req.user);
});

router.get('/logout', (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }

    req.session.destroy((err) => {
      if (!err) {
        // res.json({
        //   msg: 'Session destroyed',
        // });
        res.redirect('/login');
      } else {
        res.json({
          status: 'Error en el logout',
          body: err,
        });
      }
    });
  });
});

export default router;
