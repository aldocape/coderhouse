# Proyecto E-Commerce

Para esta entrega se ha desarrollado, por un lado, un cliente HTTP de pruebas que utiliza Axios para enviar peticiones, y por otro lado, un código de test que utiliza mocha, chai y Supertest, para probar cada uno de los métodos HTTP de la API Rest de productos.

# Cliente HTTP (Axios)

El cliente HTTP que utiliza Axios realiza un test de la funcionalidad hacia la API Rest de productos, verificando la correcta lectura de productos disponibles, incorporación de nuevos productos, modificación y borrado.

El código se encuentra en un módulo independiente, ubicado en la ruta:

- src/tests/axios.products.test.ts

y dicho código se ejecuta por medio de dos scripts:

Primero: "npm start" para dejar el server funcionando
Segundo: En otra consola, ejecutar "npm run test:axios" para hacer las pruebas con el cliente HTTP axios (se van mostrando por consola los resultados de las operaciones PUT, POST, GET y DELETE).

Estas pruebas se hacen en la BD que usamos habitualmente, debido a que los datos que se ingresan se borran al final del test.

# Testing de la aplicación (mocha, chai y supertest)

Las mismas pruebas (o similares) a las del cliente HTTP se hicieron a través de un código de test que utiliza mocha, chai (usando expect) y Supertest, para probar cada uno de los métodos HTTP de la API Rest de productos.

Para ello, se creó una suite de test para verificar si las respuestas a la lectura, incorporación, modificación y borrado de productos son las apropiadas. Se encuentra ubicado en:

- src/tests/mocha.products.test.ts

Para hacer este test, ejecutar el script: "npm run test:mocha" (en este caso, no debe estar corriendo el servidor porque vamos a conectarnos a otra BD llamada 'test').

En el caso de querer generar un reporte con los resultados obtenidos de la salida del test, ejecutar el script: "npm run test:report". Dicho reporte se generará en la carpeta ./testReport/ y su nombre tendrá el formato: 'result_YYYY-MM-DD.txt'

# Importante:

Para ejecutar el test de mocha se setea una variable de entorno NODE_ENV=TEST_INT que le indica a mongoose que debe conectarse a otra base de datos llamada 'test' en Mongo Atlas, con el fin de no alterar ningún dato de la base de datos de producción. De todas maneras, la información que se carga en la colección de productos se elimina antes y después de todos los test, usando los métodos before y after.

Por otro lado, se agregó al script de testing el parámetro "--timeout 10000" debido a que mocha tiraba un error de timeout al exceder los 2000ms que tiene preconfigurados (esto teniendo en cuenta que la BD a la que se conecta se encuentra en la nube, entonces siempre demoraba más de esa cantidad).
