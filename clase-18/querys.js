db.createUser({
  user: 'aldo',
  pwd: '123456',
  roles: [{ role: 'dbAdminAnyDatabase', db: 'admin' }],
});

db.createUser({
  user: 'admin2',
  pwd: '123456',
  roles: [{ role: 'userAdmin', db: 'ecommerce' }],
});

db.createUser(
  {
    user: 'admin01',
    pwd: passwordPrompt(), // Or  "<cleartext password>"
    customData: { employeeId: 12345 },
    roles: ['read'],
  },
  { w: 'majority', wtimeout: 5000 }
);

const clientes2 = [
  {
    nombre: 'Lucía',
    edad: 25,
  },
  {
    nombre: 'Juan',
    edad: 29,
  },
  {
    nombre: 'Fede',
    edad: 35,
  },
];

db.clientes.insertMany(clientes2);

db.createCollection('productos');
db.productos.drop();
db.dropDatabase();
db.stats();
db.articulos.storageSize();
db.articulos.totalSize();
db.articulos.validate({ full: true });

db.paises.renameCollection('countries', true); // El true es para eliminar la tabla con el nuevo nombre, si existiera
db.clientes.insertMany(clientes2, { ordered: false });
const producto = { nombre: 'Heladera Gafa', fechaCompra: ISODate() };

db.clientes.find().sort({ edad: -1 });
db.clientes.find().sort({ edad: 1 }).limit(1);
db.clientes.find().sort({ edad: 1 }).skip(1).limit(1);
db.clientes.find({ nombre: { $eq: 'Juan' }, edad: 29 });

db.clientes.find({ $and: [{ edad: { $gte: 26 } }, { edad: { $lte: 35 } }] });

db.articulos.deleteOne({ nombre: 'Moto 150 cc' });

db.articulos.estimatedDocuments();
db.articulos.estimatedDocumentCount();
db.clientes.countDocuments({ nombre: 'Juan' });

db.countries.find({ habitantes: { $gt: 50000000 } }); // también aplica gte
db.countries.find({ habitantes: { $lt: 50000000 } }); // también aplica lte

db.countries.find({ nombre: { $in: ['Italia', 'Portugal'] } }); // in
db.countries.find({ nombre: { $nin: ['Italia', 'Portugal'] } }); // not in

db.countries.find({ habitantes: { $exists: true } });

db.clientes.find({
  $and: [{ nombre: { $ne: 'Paraguay' } }, { habitantes: { $gt: 50000000 } }],
}); // nombre no igual a Paraguay y habitantes mayor a 50 millones

db.countries.find({}, { nombre: 1 }); // mostrar sólo el campo nombre en el resultado
db.countries.find({}, { nombre: false }); // mostrar todo menos el campo nombre en el resultado

db.countries
  .find({ nombre: { $ne: 'Italia' } }, { nombre: 1, habitantes: 1 })
  .limit(1); // un solo resultado de nombre = 'Italia' mostrando sólo los campos nombre y habitantes
