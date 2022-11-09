import server from './services/server';
import { PORT } from './config/config';

server.listen(PORT, () => {
  console.log(`🚀 Servidor escuchando en el puerto ${PORT}`);
});
