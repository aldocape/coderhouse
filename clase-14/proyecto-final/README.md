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
