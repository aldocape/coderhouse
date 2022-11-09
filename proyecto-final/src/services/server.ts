import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import mainRouter from '../routes/index';

const app = express();

// Disponibilizo carpeta 'public' para acceder a los estilos css
const publicPath = path.resolve(__dirname, '../../public');
app.use(express.static(publicPath));

app.get('/', (req: Request, res: Response) => {
  res.send('<h1>Hola! Bienvenido a la API de productos!</h1>');
});

app.use(express.json()); //permite json
app.use(express.urlencoded({ extended: true })); //permite form data

app.use('/api', mainRouter);

// Esto de aquí abajo es necesario para poder mostrar páginas personalizadas en caso de que
// el usuario ingrese endpoints que no son válidos
app.use((req: Request, res: Response) => {
  res.status(404).send('<h1>Page not found</h1>');
});

export default app;
