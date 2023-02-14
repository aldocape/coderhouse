# Proyecto E-Commerce

Para esta entrega se ha modificado la capa de persistencia incorporando los conceptos de Factory, DAO, y DTO.

Rutas:

- src/daos/factory.ts
- src/daos/daos.ts
- src/dto/messages.dto.ts
- src/dto/products.dto.ts

Las operaciones para las distintas persistencias (memoria, filesystem y mongodb) se implementaron dentro de la carpeta daos:

- dao-memory
- dao-filesystem
- dao-mongodb

respectivamente.

Los DAOs presentan la misma interfaz hacia la lógica de negocio de nuestro servidor.

El DAO seleccionado (por un parámetro en línea de comandos como lo hicimos anteriormente) será devuelto por una Factory para que la capa de negocio opere con él.
El nombre de la variable a usar por línea de comandos será 'dao'. Ejemplo: --dao=file. Por defecto, la dao será mongodb.

Cada uno de estos casos de persistencia fueron implementados usando el patrón singleton, que impide crear nuevas instancias de estos mecanismos de acceso a los datos.

En la ruta src/daos/factory.ts se ha creado un método para las clases MongoDB, FileSystem y Memory, que se llama getInstance(), que verifica que no exista una instancia de clase antes de crear una nueva. En src/daos/daos.ts se hicieron pruebas pidiendo a la Factory nuevas instancias de los DAOS (líneas 33 y 34), y por consola podemos ver que se crea solamente una (la instancia que creamos en las líneas 12 y 13).

En el caso de usar persistencia de mongodb, tenemos dentro del dao de mongodb (src/daos/dao-mongodb/mongodb.ts) un método también llamado getInstance() que se encarga de verificar que se conecte una sola vez a la BD, y luego crea distintas instancias para los distintos recursos (productos, mensajes, carritos, etc) pero con esa única conexión a la BD.

Se ha implementado el patrón Repository para la persistencia de productos y mensajes, haciendo que todos los daos para todas las persistencias usen los mismos métodos para manejar los distintos recursos(productHandler(), usersHandler(), messagesHandler() y cartsHandler()). Cada uno de estos métodos, crea una instancia del recurso que se va a utilizar (producto, mensaje, etc) que cuenta con los métodos necesarios para acceder a los datos y su manipulación (agregar, modificar, eliminar, etc.).
