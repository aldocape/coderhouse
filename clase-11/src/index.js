const server = require('./services/server');

const PORT = 8080;

server.listen(PORT, () => {
  console.log(`Server ready en puerto ${PORT}`);
});
