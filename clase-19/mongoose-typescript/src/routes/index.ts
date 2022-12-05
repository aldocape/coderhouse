import { Router } from 'express';
import usersRouter from './users';
// import categoriesRouter from './category';

const router = Router();

router.use('/users', usersRouter);
// router.use('/categories', categoriesRouter);

export default router;
