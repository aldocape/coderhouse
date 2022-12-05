/// Querys utilizadas con el gestor de base de datos MongoDB
/// para resolver las consignas del trabajo práctico entregable

/// Crear la base de datos
use ecommerce

// Crear las colecciones mensajes y productos

db.createCollection('mensajes')
db.createCollection('productos')

/// Agregar 10 documentos con valores distintos a las colecciones mensajes y productos.
/// El formato de los documentos debe estar en correspondencia con el que venimos utilizando 
/// en el entregable con base de datos MariaDB. 

const mensajes1 = [{
    time: '18/11/2022 11:05:14',
    user: 'juan@hotmail.com',
    text: 'Holaaa buen diaaa',
}, {
    time: '18/11/2022 11:06:25',
    user: 'pedro@gmail.com',
    text: 'Hola!',
}, {
    time: '18/11/2022 11:17:03',
    user: 'lucia@hotmail.com',
    text: 'Qué tal?', 
}, {
    time: '18/11/2022 12:03:36',
    user: 'diego@outlook.com',
    text: 'Cómo están todos?', 
}, {
    time: '18/11/2022 12:21:05',
    user: 'lucia@hotmail.com',
    text: 'Bien! Haciendo tareas para la facu', 
}]

const mensajes2 = [{
    time: '18/11/2022 12:22:49',
    user: 'pedro@gmail.com',
    text: 'Se vienen difíciles los parciales me dijeron', 
}, {
    time: '18/11/2022 12:25:14',
    user: 'diego@outlook.com',
    text: 'Escuché lo mismo', 
},{
    time: '18/11/2022 12:28:14',
    user: 'lucia@hotmail.com',
    text: 'Si chicos!! Y mucho para estudiaar no sé si llegooooo :P', 
}, {
    time: '18/11/2022 12:33:29',
    user: 'juan@hotmail.com',
    text: 'Tranqui tratemos de juntarnos en algún momento el fin de semana y adelantamos', 
}, {
    time: '18/11/2022 12:36:47',
    user: 'diego@outlook.com',
    text: 'Buena idea Juan!! Y de paso después nos vamos a tomar algo por ahí', 
}]

db.mensajes.insertMany(mensajes1)
db.mensajes.insertMany(mensajes2)

/// Definir las claves de los documentos en relación a los campos de las tablas de esa base.
///En el caso de los productos, poner valores al campo precio entre los 100 y 5000 pesos
/// (eligiendo valores intermedios, ej: 120, 580, 900, 1280, 1700, 2300, 2860, 3350, 4320, 4990). 

const productos1 = [{
    timestamp: ISODate(),
    nombre: "Colchón 2 1/2 plazas de espuma Piero box blanco y gris - 140cm x 190cm x 25cm",
    descripcion: "Construido con espuma de poliuretano, el colchón tiene una larga y duradera vida. Este tipo de material hace que la posición que adopte el cuerpo sea ergonómica y permite que se reparta el peso sobre la superficie de manera balanceada.",
    codigo: "Piero2331",
    foto: "https://http2.mlstatic.com/D_NQ_NP_622492-MLA48099676614_112021-O.webp",
    precio: 580
}, {
    timestamp: ISODate(),
    nombre: "Microondas Tedge 20 Litros Digital Blanco 220v 5 Potencia",
    descripcion: "Somos TEDGE. Nos propusimos crear productos de tecnología con alta calidad, ofreciendo a nuestros compradores una gran variedad y los mejores precios del mercado.",
    codigo: "Tedge4890",
    foto: "https://http2.mlstatic.com/D_NQ_NP_984100-MLA48430605662_122021-O.webp",
    precio: 3350
}, {
    timestamp: ISODate(),
    nombre: "Google Chromecast 3ª Generación Full Hd Carbón",
    descripcion: "Gracias a su compatibilidad con streaming en Full HD vas a aprovechar de todo el contenido disponible que más te guste en alta definición, con imágenes de colores más vibrantes y llamativos en comparación a su predecesor HD.",
    codigo: "SKU GA00439-LA",
    foto: "https://http2.mlstatic.com/D_NQ_NP_620605-MLA32691559317_102019-O.webp",
    precio: 2300
}, {
    timestamp: ISODate(),
    nombre: "Heladera No Frost Electrolux Dfn3000b Blanca 265lts",
    descripcion: "Combina funcionalidad con tamaño compacto, brindando practicidad y comodidad en tu día a día.",
    codigo: "298465798",
    foto: "https://http2.mlstatic.com/D_NQ_NP_768978-MLA32121237114_092019-O.webp",
    precio: 120
}, {
    timestamp: ISODate(),
    nombre: "Ionizador Solar Pileta Gadnic Boya Anti Sarro Y Bacterias",
    descripcion: "Esta boya utiliza tecnología solar y ionización para reducir el uso de cloro, productos químicos y eliminar la mayor cantidad de algas y microorganismos de su pileta.",
    codigo: "96543289",
    foto: "https://http2.mlstatic.com/D_NQ_NP_872722-MLA52025064505_102022-O.webp",
    precio: 900
}]

const productos2 = [{
    timestamp: ISODate(),
    nombre: "Waflera Anti Adherente Atma",
    descripcion: "Capacidad: 2 Waffles - Superficie anti adherente de fácil limpieza",
    codigo: "995498776",
    foto: "https://http2.mlstatic.com/D_NQ_NP_988001-MLA51090154926_082022-O.webp",
    precio: 4990
}, {
    timestamp: ISODate(),
    nombre: "Ventilador De Pie Sansei Blanco Con 3 Palas De Plástico",
    descripcion: "3 Palas De Plástico, 16 De Diámetro 220 V 50 W",
    codigo: "5850284572",
    foto: "https://http2.mlstatic.com/D_NQ_NP_795909-MLA48807770269_012022-O.webp",
    precio: 1280
}, {
    timestamp: ISODate(),
    nombre: "Tostadora Eléctrica Atma To2180wp 700w",
    descripcion: "Capacidad para 2 rebanadas - Potencia 700W - Diferentes niveles de tostado",
    codigo: "05928039371",
    foto: "https://http2.mlstatic.com/D_NQ_NP_802106-MLA51916932560_102022-O.webp",
    precio: 2860
}, {
    timestamp: ISODate(),
    nombre: "Lavarropas Carga Frontal Electrolux Elaf06w 6kg",
    descripcion: "Lavarropas Carga Frontal Electrolux 6kg. Su puerta elevada y con apertura 180° facilita la carga. Cuenta con 900 rpm y eficiencia energética A+. Posee 15 programas adaptados a tus necesidades.",
    codigo: "49298274922",
    foto: "https://http2.mlstatic.com/D_NQ_NP_879592-MLA31352699363_072019-O.webp",
    precio: 4320
}, {
    timestamp: ISODate(),
    nombre: "Aire acondicionado Sansei split inverter frío/calor",
    descripcion: "Capacidad de refrigeración: 3300 W - 2838 frigorías",
    codigo: "94827376593",
    foto: "https://http2.mlstatic.com/D_NQ_NP_992152-MLA50583456133_072022-O.webp",
    precio: 1700
}]

db.productos.insertMany(productos1)
db.productos.insertMany(productos2)

/// Listar todos los documentos en cada colección.
db.productos.find()
db.mensajes.find()

/// Mostrar la cantidad de documentos almacenados en cada una de ellas.
db.mensajes.estimatedDocumentCount()
db.productos.estimatedDocumentCount()

// Realizar un CRUD sobre la colección de productos:

// Agregar un producto más en la colección de productos 
const nuevoProducto = {
    timestamp: ISODate(),
    nombre: "Arbol De Navidad Bavaria 1,80 Mts Premium",
    descripcion: "Nuestra Linea de Arboles de Navidad es Calidad PREMIUM. Disfruta de la mejor Navidad con nuestros productos.",
    codigo: "4040958383",
    foto: "https://http2.mlstatic.com/D_NQ_NP_674171-MLA52279846375_112022-O.webp",
    precio: 3690
}

db.productos.insertOne(nuevoProducto)

// Realizar una consulta por nombre de producto específico
db.productos.find({nombre: 'Waflera Anti Adherente Atma'})

// Listar los productos con precio menor a $1000
db.productos.find({ precio: { $lt: 1000 } })

// Listar los productos con precio entre $1000 y $3000
db.productos.find({ $and: [{ precio: { $gte: 1000 } }, { precio: { $lte: 3000 } }] })

// Listar los productos con precio mayor a $3000
db.productos.find({ precio: { $gt: 3000 } })

// Realizar una consulta que traiga sólo el nombre del tercer producto más barato.
db.productos.find({}, { nombre: true }).sort({ precio: 1 }).skip(2).limit(1)

// Hacer una actualización sobre todos los productos, agregando el campo stock a todos ellos con un valor de 100.
db.productos.updateMany({}, {$set: {stock: 100}})

// Cambiar el stock a cero de los productos con precios mayores a 4000 pesos. 
db.productos.updateMany({precio: {$gt: 4000}}, {$set: {stock: 0}})

// Borrar los productos con precio menor a 1000 pesos 
db.productos.deleteMany({ precio: { $lt: 1000 } })

// Crear un usuario 'pepe' clave: 'asd456' que sólo pueda leer la base de datos ecommerce.
// Verificar que pepe no pueda cambiar la información.

use admin

db.createUser(
    {
      user: "pepe",
      pwd: "asd456",
      roles: [
         { role: "read", db: "ecommerce" }
      ]
    }
  )
  