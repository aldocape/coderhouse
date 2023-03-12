<p align="center">
  <a href="http://deno.land/" target="blank"><img src="https://upload.wikimedia.org/wikipedia/commons/8/84/Deno.svg" width="200" alt="Deno Logo" /></a>
</p>

## Consigna

Servidor en Deno

Crear un servidor y configurar denon para que, ante un cambio de código, el servidor se reinicie automáticamente.
El servidor presenta en su ruta raíz un formulario de ingreso de un color, que será enviado al endpoint '/colors' por método post. Dicho color (en inglés) será incorporado a un array de colores persistido en memoria.
Al momento de enviar el dato requerido, el usuario será redirigido a una vista en la url http://localhost:8080/colors en la cual se representarán los colores recibidos en una lista desordenada (ul) utilizando el mismo color para la letra en cada caso. El color de fondo de la vista es de color negro, para poder visualizar los colores correctamente.
Las dependencias utilizadas se exportan desde el archivo deps.ts situado en la raíz del proyecto.

## Iniciar la app

```bash
# development
$ denon start

```
