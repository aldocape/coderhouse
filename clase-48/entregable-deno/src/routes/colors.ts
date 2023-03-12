import { Router, Context } from '../../deps.ts';
import { getColors, addColor } from '../controllers/colors.ts';

const router = new Router();

router
  .get('/', async (ctx: Context) => {
    await ctx.render('form.eta'); //Show home view
  })
  .get('/colors', getColors) // Get all colors
  .post('/colors', addColor); // Add a color

export default router;
