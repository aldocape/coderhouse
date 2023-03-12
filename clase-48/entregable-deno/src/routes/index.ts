import { Router } from '../../deps.ts';
import colorsRouter from './colors.ts';

const router = new Router();

router.use(colorsRouter.routes());

export default router;
