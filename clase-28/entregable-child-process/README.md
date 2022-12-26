# Trabajo práctico entregable - Global & child process

Todas las claves y credenciales utilizadas (en este caso se hizo solamente con el string de conexión de MongoDB) se han movido a un archivo .env, que se carga mediante la librería dotenv en la ruta config/index.ts, y luego se importa en services/database.ts.

La única configuración que no ha sido manejada con esta librería fue la del puerto de escucha del servidor, el cual es leído de los argumentos pasados por línea de comandos, usando la librería yargs. Esta funcionalidad está implementada en ruta services/server.ts (en la línea 14 seteo el valor por default que tendrá la variable 'port' en caso de que no se pase por línea de comandos).

Notar que en package.json hay un script "start" que ya cuenta con algunos parámetros de prueba definidos

Se agregó una ruta '/info' que presenta en una vista sencilla los siguientes datos:

- Argumentos de entrada
- Nombre de la plataforma (sistema operativo)
- Versión de node.js
- Memoria total reservada (rss)
- Path de ejecución
- Process id
- Carpeta del proyecto

Se agregó otra ruta '/api/randoms' que permite calcular un cantidad de números aleatorios en el rango del 1 al 1000 especificada por parámetros de consulta (query).
Por ej: /api/randoms?cant=20000.
Si dicho parámetro no se ingresa, se calculan 100.000.000 números.
El dato devuelto al frontend es un objeto que contiene como claves los números random generados junto a la cantidad de veces que salió cada uno (está implementado en la ruta utils/tools.ts). Esta ruta no es bloqueante (para ello se ha utilizado el método fork de child process).

Se utilizaron routers y apis separadas para esta funcionalidad (ver routes/random.ts).
