import { Application, viewEngine, oakAdapter, etaEngine } from '../../deps.ts';
import mainRouter from '../routes/index.ts';

const app = new Application();

app.use(
  viewEngine(oakAdapter, etaEngine, {
    viewRoot: './views',
  })
);

app.use(mainRouter.routes());

export default app;
