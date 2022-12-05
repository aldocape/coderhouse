import server from '../src/services/server.js';

const PORT = 8080;

server.listen(PORT, () => {
  console.log(`Server up en puerto ${PORT}`);
});
