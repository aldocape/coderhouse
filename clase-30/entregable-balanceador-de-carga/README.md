# Trabajo práctico entregable - Uso de cluster, fork, forever, pm2 y nginx

Tomando como base el proyecto que vamos realizando, se agregó un parámetro más en la ruta de comando que permite ejecutar al servidor en modo fork o cluster. Dicho parámetro será 'FORK' en el primer caso y 'CLUSTER' en el segundo, y de no pasarlo, el servidor iniciará en modo fork. La 'key' del parámetro es 'mode'.
(Ej: node dist/index.js --port=3000 --mode=cluster)

> Se agregó en la vista info, el número de procesadores presentes en el servidor.

> Para ejecutar el servidor con nodemon e intercambiar entre los modos FORK y CLUSTER, modificar el archivo nodemon.json y cambiar el valor del parámetro 'mode' poniendo 'fork' o 'cluster' según corresponda. Por consola del servidor se puede verificar el número de procesos tomados por node, donde se mostrará el pid del proceso principal, y los pid de los procesos hijos, los que se irán también actualizando al refrescar en el endpoint localhost/info (con Ctrl+F5).

> Las librerías forever y pm2 se instalaron en forma global en el sistema, asique deben estar instaladas o sino instalarlas en forma local con npm. Se puede ejecutar el servidor utilizando Forever con el script "npm run prod" en el cual se pueden cambiar los parámetros para hacer distintas pruebas.
> Hay varios scripts en package.json con comandos predefinidos.

Se hicieron pruebas con distintos puertos y distintos modos de ejecución del servidor. En el directorio raíz del proyecto están las capturas de pantalla del listado de los procesos utilizando forever y utilizando el sistema operativo (en mi caso Linux, con el comando 'top').

> Los comandos utilizados están en el archivo 'comandos.txt' en la raíz del proyecto.

Se configuró Nginx para balancear cargas de nuestro servidor de la siguiente manera:
Todas las consultas a /api/randoms se redirigen a un cluster de servidores escuchando en el puerto 8081.

> El cluster fue creado desde node utilizando el módulo nativo cluster, con el comando:

forever start dist/index.js -w --port=8081 --mode=cluster

El resto de las consultas, se redirigen a un servidor individual escuchando en el puerto 8080.

Luego, se modificó la configuración para que todas las consultas a /api/randoms sean redirigidas a un cluster de servidores gestionado desde nginx, repartiéndolas equitativamente entre 4 instancias escuchando en los puertos 8082, 8083, 8084 y 8085 respectivamente.

Con el fin de que se vea cada puerto utilizado, hice que el endpoint devuelva en el json un mensaje: "Hola desde el puerto ....", además del cálculo del array Random del entregable anterior.

> Para crear estas instancias utilicé el comando: pm2 start ecosystem.config.js

> Se ha incluído el archivo de configuración de nginx junto con el proyecto, y un pequeño documento en donde se detallan los comandos que deben ejecutarse por línea de comandos y los argumentos que deben enviarse para levantar todas las instancias de servidores de modo que soporten la configuración detallada en los puntos anteriores.
