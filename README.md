Primera entrega del Proyecto Final

eCommerce Backend

La aplicación implementa un servidor de aplicación basado en la plataforma Node.js y el módulo express. El servidor tiene dos conjuntos de rutas agrupadas en routers, uno con la url base '/api/productos' y el otro con '/api/carrito'. El puerto de escucha será el 8080 para desarrollo y process.env.PORT para producción en glitch.com

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

4. Cada producto dispone de los siguientes campos: id, timestamp, nombre, descripcion, código, foto (url), precio, stock.

5. El carrito de compras tiene la siguiente estructura: id, timestamp(carrito), productos: { id, timestamp(producto), nombre, descripcion, código, foto (url), precio, stock }

6. El timestamp se ha implementado con el uso de la librería moment

7. Mediante el uso de la librería filesystem se mantiene la persistencia de datos de los productos y del carrito de compras.

8. La estructura de programación es ECMAScript, separada en tres en módulos básicos (router, en directorio "routes", lógica de negocio/api, en archivos controller/carts.ts y controller/products.ts y persistencia, cuya funcionalidad se desarrolla en el archivo controller/files.ts). Más adelante implementaremos el desarrollo en capas. Se ha utilizado preferentemente clases, constructores de variables let y const y arrow function.

Para la transpilación de TypeScript a Javascript, usar el script: npm run build
Para la ejecución de la aplicación en modo desarrollador, usar el script: npm run dev

Ejemplos que se probaron en Postman:

Carga de Productos:

curl --location --request POST '127.0.0.1:8080/api/productos/' \
--header 'Content-Type: application/json' \
--data-raw '{
"nombre": "Colchón 2 1/2 plazas de espuma Piero box blanco y gris - 140cm x 190cm x 25cm",
"descripcion": "Construido con espuma de poliuretano, el colchón tiene una larga y duradera vida. Este tipo de material hace que la posición que adopte el cuerpo sea ergonómica y permite que se reparta el peso sobre la superficie de manera balanceada.",
"codigo": "Piero2331",
"foto": "https://http2.mlstatic.com/D_NQ_NP_622492-MLA48099676614_112021-O.webp",
"precio": 61619,
"stock": 3
}'

curl --location --request POST '127.0.0.1:8080/api/productos/' \
--header 'Content-Type: application/json' \
--data-raw '{
"nombre": "Microondas Tedge 20 Litros Digital Blanco 220v 5 Potencia",
"descripcion": "Somos TEDGE. Nos propusimos crear productos de tecnología con alta calidad, ofreciendo a nuestros compradores una gran variedad y los mejores precios del mercado.",
"codigo": "Tedge4890",
"foto": "https://http2.mlstatic.com/D_NQ_NP_984100-MLA48430605662_122021-O.webp",
"precio": 20999,
"stock": 6
}'

curl --location --request POST '127.0.0.1:8080/api/productos/' \
--header 'Content-Type: application/json' \
--data-raw '{
"nombre": "Google Chromecast 3.ª Generación Full Hd Carbón",
"descripcion": "Gracias a su compatibilidad con streaming en Full HD vas a aprovechar de todo el contenido disponible que más te guste en alta definición, con imágenes de colores más vibrantes y llamativos en comparación a su predecesor HD.",
"codigo": "SKU GA00439-LA",
"foto": "https://http2.mlstatic.com/D_NQ_NP_620605-MLA32691559317_102019-O.webp",
"precio": 12499,
"stock": 10
}'

Creación de un carrito (vacío, sólo con la fecha y hora de la creación, posteriormente se le agregan productos de a uno)

curl --location --request POST '127.0.0.1:8080/api/carrito'

Agrego dos productos al carrito

curl --location --request POST '127.0.0.1:8080/api/carrito/19e69392-8418-46d5-a570-9cd610db04f4/productos' \
--header 'Content-Type: application/json' \
--data-raw '{
"productId": "9d5a079c-38f3-4788-b5a3-0a5907b9ef70"
}'

curl --location --request POST '127.0.0.1:8080/api/carrito/19e69392-8418-46d5-a570-9cd610db04f4/productos' \
--header 'Content-Type: application/json' \
--data-raw '{
"productId": "7e1845d6-6aaa-4926-bff6-db3a291c40cb"
}'

Elimino un producto del carrito

curl --location --request DELETE '127.0.0.1:8080/api/carrito/19e69392-8418-46d5-a570-9cd610db04f4/productos/9d5a079c-38f3-4788-b5a3-0a5907b9ef70'

Elimino un carrito

curl --location --request DELETE '127.0.0.1:8080/api/carrito/19e69392-8418-46d5-a570-9cd610db04f4'
