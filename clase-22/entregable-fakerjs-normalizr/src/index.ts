import server from './services/server';

// La conexión a la base de datos de MongoDB Atlas la ejecuto directamente en el script database
import './services/db';

// Utilizo el puerto de escucha 8080 para desarrollo y process.env.PORT para producción
const PORT: number | string = process.env.PORT || 8080;

server.listen(PORT, () => {
  console.log(`🚀 Servidor escuchando en el puerto ${PORT}`);
});

// En caso de error, lo muestro a través del método 'on' sobre la salida de 'listen'
server.on('error', (error: any) => console.log(`Error en servidor ${error}`));
