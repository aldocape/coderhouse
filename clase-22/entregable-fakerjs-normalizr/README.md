Trabajo Práctico entregable - Fakerjs y Normalizr

> > Consigna 1:
> > Sobre el desafío entregable de la clase 8 (sql y node: nuestra primera base de datos), crear una vista en forma de tabla que consuma desde la ruta ‘/api/productos-test’ del servidor una lista con 5 productos generados al azar utilizando Faker.js como generador de información aleatoria de test (en lugar de tomarse desde la base de datos). Elegir apropiadamente los temas para conformar el objeto ‘producto’ (nombre, precio y foto).

> > Consigna 2:

Ahora, vamos a reformar el formato de los mensajes y la forma de comunicación del chat (centro de mensajes).

Con la siguiente estructura:

time: string;
text: string;
author: {
email: string; // Sería el id del autor del mensaje, es único y lo identifica, no se repite
nombre: string;
apellido: string;
edad: number;
alias: string;
avatar: string;
};

> > Consigna 3:

Además se deberá modificar la persistencia de los mensajes para que utilicen un contenedor que permita guardar objetos anidados (archivos, mongodb, firebase). En este caso utilicé Mongo Atlas.

**Guía para el tutor:**

La generación de datos de productos con faker se hace en el archivo controller/products.ts

En services/db.ts realizo la conexión a la BD de Mongo Atlas, a la cual invoco en index.ts
Se debe cargar la info de conexión en un archivo .env, con los parámetros indicados en .env.example

El mensaje llega desde la BD hacia el backend, que recibe un array de mensajes a representar en su vista.
El array que se devuelve se muestra en tres vistas: original, normalizado (conteniendo una entidad de autores) y desnormalizado (estas dos últimas usando la librería normalizr). El array de mensajes tiene sus autores con su correspondiente id (mail del usuario).

El frontend muestra los datos normalizados que recibe desde el backend, usando el endpoint /api/mensajes/normalized, y a partir de allí se presenta la información adecuada en la vista.

Los request a la API se efectúan desde el archivo scripts/main.js que está en la carpeta public

En el schema definido, se cambia el nombre del id con que se normaliza el nombre de los autores a 'email', y el de mensajes a '\_id' debido a que se encuentran alojados en una base de datos de MongoDB.

También se presenta en el frontend (a modo de test) el porcentaje de compresión de los mensajes recibidos.

Se muestran también por consola en el navegador los datos obtenidos, en las 3 vistas (original, normalizado y desnormalizado)
