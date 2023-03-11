<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

## Consigna

Reformar para usar otro framework

Se ha elegido uno de los frameworks vistos en clase (en este caso es Nest), y se ha implementado en esta nueva plataforma una API Rest de productos.

Por medio del comando 'nest-generate' se han creado los services, controllers, y module de productos, todos ubicados en la carpeta src/products.

También tenemos una carpeta 'dto' dentro de 'products' que contiene el esquema de nuevo producto, de producto ya existente, y los decoradores necesarios para que funcione la api y además podamos contar con dicha documentación en swagger.

- La url de la documentación en swagger es: 'http://localhost:8080/api-docs'

Además contamos con dos vistas sencillas (usando el decorador @Render) implementando el motor de plantillas 'ejs'. Una muestra un mensaje 'Hello world' en nuestra 'home', y luego tenemos otra vista de todos los productos, en la url: 'http://localhost:8080/products/view'. Dichas vistas están dentro de la carpeta 'views'.

La base de datos utilizada es MongoDB (configurada en path 'src/app.module.ts'), cuyo string de conexión está configurado como variable de entorno, al que accedemos desde la ruta 'src/config/index.ts'. Aquí también recibimos el puerto que vamos a utilizar.

Por último, en archivo main.ts trabajamos con una tercera variable de entorno (NODE_ENV), que nos indica si estamos en modo 'development' o 'production'. En el primer caso, accedemos a la docu de swagger, y en el segundo, dicha documentación no estará disponible.

Las pruebas para el funcionamiento de la API Rest se pueden realizar desde el mismo swagger (que nos indica la estructura y los tipos de datos) o también desde Postman.

## Instalación

```bash
$ npm install
```

## Iniciar la app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
