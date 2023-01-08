export default {
  PORT: process.env.PORT || 8080,
  mongoLocal: {
    client: 'mongodb',
    cnxStr: 'mongodb://admin:123456@localhost:27017/ecommerce',
  },
  mongoRemote: {
    client: 'mongodb',
    cnxStr:
      'mongodb+srv://coderhouse:zj8Ztt8DpiXNq3HF@cluster0.rhuhd.mongodb.net/ecommerce?retryWrites=true&w=majority',
  },
  sqlite3: {
    client: 'sqlite3',
    connection: {
      filename: `./DB/ecommerce.sqlite`,
    },
    useNullAsDefault: true,
  },
  mariaDb: {
    client: 'mysql',
    connection: {
      host: 'localhost',
      user: 'admin',
      password: 'password',
      database: 'coderhouse',
    },
  },
  fileSystem: {
    path: './DB',
  },
};
