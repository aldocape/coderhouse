Segunda entrega del Proyecto Final

eCommerce Backend

Tomando como base el proyecto de la primera entrega, esta vez se modificó la persistencia de los datos para ser alojados en un servidor de Mongo Atlas

1. El router base '/api/productos' implementa cuatro funcionalidades:
   GET: '/:id?' - Me permite listar todos los productos disponibles ó un producto por su id (disponible para usuarios y administradores)
   POST: '/' - Para incorporar productos al listado (disponible para administradores)
   PUT: '/:id' - Actualiza un producto por su id (disponible para administradores)
   DELETE: '/:id' - Borra un producto por su id (disponible para administradores)

2. El router base '/api/carrito' implementa tres rutas disponibles para usuarios y administradores:
   POST: '/' - Crea un carrito y devuelve su id.
   DELETE: '/:id' - Vacía un carrito y lo elimina.
   GET: '/:id/productos' - Me permite listar todos los productos guardados en el carrito
   POST: '/:id/productos' - Para incorporar productos al carrito por su id de producto
   DELETE: '/:id/productos/:id_prod' - Eliminar un producto del carrito por su id de carrito y de producto

3. También se ha creado una variable booleana isAdmin (ruta './config/config.ts), cuyo valor se configurará más adelante con el sistema de login. Según su valor (true ó false) me permitirá alcanzar o no las rutas indicadas. En el caso de recibir un request a una ruta no permitida por el perfil, devuelve un objeto de error, que es el siguiente: { error : -1, descripcion: ruta 'x' método 'y' no autorizada }

4. Cada producto dispone de los siguientes campos: nombre, descripcion, código, foto (url), precio, stock, además de los campos \_id, createdAt y updatedAt que se generan automáticamente.

5. El carrito de compras tiene la siguiente estructura: un array de nombre productos que contiene objetos con la estructura: { ObjectId(IddeProducto) }, además de un \_id y timestamps que se crean automáticamente. Cada objeto del array está referenciado en la colección que contiene los productos.

# Datos Mongo Atlas

El nombre de la base de datos es: ecommerce
El nombre de la colección de productos es: products
El nombre de la colección de carritos es: carts

Para la transpilación de TypeScript a Javascript, usar el script: npm run build

Para la ejecución de la aplicación en modo desarrollador, usar el script: npm run dev

**_ Atención _**

La creación de productos se puede hacer directamente por medio de un formulario de carga en la ruta base del proyecto, que escucha en el puerto correspondiente (8080 en modo dev del localhost).

## Ejemplos CRUD carritos en Postman:

Para la creación de un carrito vacío:

curl --location --request POST '127.0.0.1:8080/api/carrito'

Para la creación de un carrito con un producto:

curl --location --request POST '127.0.0.1:8080/api/carrito' \
--header 'Content-Type: application/json' \
--data-raw '{
"prodId": "6386907d6b5ec2c8567e5f8a"
}'

Para agregar un producto a un carrito existente:

curl --location --request POST '127.0.0.1:8080/api/carrito/638520bf5525bc6eb75c2f1b/productos' \
--header 'Content-Type: application/json' \
--data-raw '{
"prodId": "63869387cd1e9e749918c66d"
}'

Eliminar un producto del carrito

curl --location --request DELETE '127.0.0.1:8080/api/carrito/638520bf5525bc6eb75c2f1b/productos/63869387cd1e9e749918c66d' \
--header 'Content-Type: application/json' \
--data-raw '{
"prodId": "63869387cd1e9e749918c66d"
}'

Eliminar un carrito

curl --location --request DELETE '127.0.0.1:8080/api/carrito/6387cb0f243c6a49c98d0750'
