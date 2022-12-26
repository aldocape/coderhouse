import { Request, Response, NextFunction } from 'express';

export const isLoggedIn = (req: Request, res: Response, next: NextFunction) => {
  console.log(req.isAuthenticated());

  if (req.isAuthenticated()) next();
  else res.redirect('/login');
};
