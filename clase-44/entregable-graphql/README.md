# Proyecto E-Commerce con GraphQL

En base al último proyecto entregable de servidor API RESTful, se ha reformado la capa de routeo y el controlador de productos para que los requests puedan ser realizados a través del lenguaje de query GraphQL.

En src/services/graphql.services.ts se define el conjunto completo de datos para operar con productos y define cómo un cliente puede acceder a esos datos.
En este caso, estos tipos son Query, Mutation, Product (DTO de Producto que agrega los campos precioARS y precioUSD), NewProduct (producto devuelto directamente por el método save, que no es modificado por el DTO), y los Inputs IProduct e IProductEdit (este último similar al anterior, con la diferencia de que todos sus campos son opcionales para poder cambiar con update sólo los campos que necesitemos).

Luego, en la línea 45 del archivo src/services/server.ts se incorporan al middleware de graphql, haciéndolas disponibles en la ruta /graphql.

En la ruta src/controllers/graphql/products.controllers.ts encontramos los controladores que conectan los root resolvers con los métodos de la api.

# Importante:

Estos controladores trabajan con las funciones de manejo de persistencia que operan sobre la colección de productos, que al ser las mismas que las que usaba la API REST, nos permiten trabajar en distintas persistencias (memoria, archivo y mongodb). Este último DAO se carga por defecto, pero si queremos cambiar la persistencia iniciamos la aplicación con node dist/index.js --dao=memory, por ejemplo. Para usar filesystem, usar '--dao=file'.

Por último, se ha reformado el frontend para soportar GraphQL y poder dialogar apropiadamente con el backend. Para esto se han modificado los request que utilizan Fetch en el archivo public/js/main.js, para que nos permitan realizar la carga de producto y obtener todos los productos, accediendo al endpoint '/graphql' (ver líneas 66 y 159).

Se ha disponibilizado el endpoint '/graphql para utilizar GraphiQL con el fin de realizar la prueba funcional de los querys y las mutaciones.
