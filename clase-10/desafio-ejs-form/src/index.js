const server = require('./services/server');

const puerto = 5000;

server.listen(puerto, () => console.log('Server up en puerto', puerto));
