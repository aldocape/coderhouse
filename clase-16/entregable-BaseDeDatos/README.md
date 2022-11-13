Trabajo Práctico entregable - SQL y Node.js

> > Consigna: Tomando como base las clases Contenedor en memoria y en archivos, desarrollar un nuevo contenedor con idénticos métodos pero que funcione sobre bases de datos, utilizando Knex para la conexión. Esta clase debe recibir en su constructor el objeto de configuración de Knex y el nombre de la tabla sobre la cual trabajará. Luego, modificar el desafío entregable de la clase 11 ”Chat con Websocket”, y:

- cambiar la persistencia de los mensajes de filesystem a base de datos SQLite3.
- cambiar la persistencia de los productos de memoria a base de datos MariaDB.

Desarrollar también un script que utilizando knex cree las tablas necesarias para la persistencia en cuestión (tabla mensajes en sqlite3 y tabla productos en mariaDb).

> > Notas:
> > Definir una carpeta DB para almacenar la base datos SQLite3 llamada ecommerce

**_ Script de creación de tablas _**
Importante: Con el fin de poder hacer la persistencia de los datos (tabla mensajes en sqlite3 y tabla productos en mariaDb), en la línea 14 del archivo src/services/server.ts, tenemos la importación de una función (utils/createTables.ts) para poder crear las tablas en la base de datos (y de paso se cargaron unos datos de ejemplo para mostrar en el front cuando inicia la aplicación). En la línea 15 es donde se ejecuta.
Se sugiere comentar dichas líneas una vez creadas las tablas, para que no se pierda información cada vez que se reinicia la api.

**_ Frontend _**
Se ha realizado una aplicación frontend sencilla, que se conecta a la api por medio de fetch (en carpeta public/scripts/main.js) para poder traer la información y mostrarla en el html (productos en formato 'cards' y mensajes uno debajo del otro). Este archivo también dispone de una función guardarEnBD que recibe 2 parámetros: endpoint y body, para poder establecer nuevamente una comunicación entre front y backend, pero en vez de hacer 'get', en este caso hace los 'post', para productos o mensajes, según sea el caso. De esta manera, podemos capturar el evento 'submit' en los formularios de productos y de mensajes y manipular el dom, sin recargar la página.

**_ Websockets _**
El archivo main.js también maneja los eventos de websockets con los métodos 'emit' y 'on', que envía o recibe del server respectivamente.

**_ Routers _**
La aplicación usa routers para los 2 recursos que maneja (productos y mensajes), los cuales acceden a los métodos que van a usar, desde sus respectivos 'controllers', para poder realizar las operaciones que correspondan.
El router del recurso 'productos' implementa middlewares para verificar si el usuario está autorizado (ver archivo config/config.ts) y también para validar los inputs.
En el caso de mensajes, sin validación de usuario, sólo de los inputs.

**_ Controllers _**
En cada controlador, se crea una instancia de la Clase que utiliza knex para establecer conexión con las bases de datos (MariaDB en el caso de los productos, y SQLite3 en el caso de los mensajes).
Al momento de crear la instancia, se le pasan por parámetro el objeto de configuración de Knex y el nombre de la tabla sobre la cual trabajará, como pide la consigna.

**_ Clases _**
Las clases mencionadas están en las rutas: services/messages.ts, y services/products.ts
También hay un archivo 'db.ts' dentro de 'services' que tiene los datos de configuración que luego son importados y pasados a las clases.
Importante: Debemos tener creada en mysql una base de datos con el nombre 'coderhouse', donde se creará la tabla 'products'. En SQLite3 la BD se crea directamente dentro de la carpeta DB del proyecto.

**_ Librerías auxiliares _**
Se ha utilizado la librería morgan para ver por consola los métodos que se ejecutan y tiempo de respuesta de cada uno. También la librería dotenv que permite utilizar variables de entorno, para cuando a futuro tengamos nuestro repositorio privado y necesitemos esconder algunos datos y configuraciones sensibles. Ambas librerías recomendadas por el profe en el after, con las que he quedado muy a gusto.
