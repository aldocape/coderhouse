import minimist from 'minimist';

const optionalArgsObject = {
  alias: {
    p: 'puerto',
    d: 'debug',
    m: 'modo',
  },
  default: {
    modo: 'prod',
    puerto: 0,
    debug: 'false',
  },
};

const args = minimist(process.argv.slice(2), optionalArgsObject);

const objetoFinal = {
  otros: args._,
  modo: args.modo,
  debug: args.debug,
  puerto: args.puerto,
};

console.log(objetoFinal);
