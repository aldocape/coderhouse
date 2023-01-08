import passport from 'passport';

const passportOptions = { badRequestMessage: 'Falta username o password' };

export const signUp = (req, res, next) => {
  try {
    passport.authenticate('signup', passportOptions, (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(401).json(info);
      }
      res.json({
        msg: 'SignUp OK',
      });
    })(req, res, next);
  } catch (err) {
    console.log(err);
  }
};

export const login = (req, res) => {
  res.json({ msg: 'Bienvenido!!', user: req.user });
};

export const getHome = (req, res) => {
  res.json(req.session);
};
