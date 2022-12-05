import express, { Request, Response, NextFunction } from 'express';

const app = express();

app.use((req: Request, res: Response, next: NextFunction) => {
  console.log('Hola desde el middleware');
  next();
});

app.get('/', (req: Request, res: Response) => {
  res.send('Holaaaa');
});

export default app;
