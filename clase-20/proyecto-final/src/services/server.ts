import express, { Express, Request, Response, NextFunction } from 'express';
import { HttpException } from '../utils/tools';
import path from 'path';
import mainRouter from '../routes/index';

const app: Express = express();

// Disponibilizo carpeta 'public' para acceder a los estilos css
const publicPath = path.resolve(__dirname, '../../public');
app.use(express.static(publicPath));

// Le indico que voy a usar el motor de plantillas 'ejs'
app.set('view engine', 'ejs');

app.get('/', (req: Request, res: Response) => {
  res.render('index');
});

app.use(express.json()); //permite json
app.use(express.urlencoded({ extended: true })); //permite form data

app.use('/api', mainRouter);

// Middleware para mostrar si hubo algún error
app.use(function (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof HttpException) {
    return res.status(err.status).json({
      msg: 'There was an unexpected error',
      error: err.message,
    });
  }
  next(err);
});

// Esto es necesario para poder mostrar páginas personalizadas en caso de que
// el usuario ingrese endpoints que no son válidos
app.use((req: Request, res: Response) => {
  res.status(404).send('<h1>Page not found</h1>');
});

export default app;
