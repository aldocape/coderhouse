# Log-in por formulario

Se ha incorporado a la app un mecanismo sencillo que permite loguear un cliente por su nombre mediante un formulario de ingreso.

Luego de que el usuario esté logueado, se muestra sobre el contenido del sitio un cartel con el mensaje “Bienvenid@” y el nombre de usuario. Este cartel tiene un botón de deslogueo a su derecha.

El cliente permanece logueado en los reinicios de la página, mientras no expire el tiempo de inactividad de 5 minutos, que se recargará con cada request. En caso de alcanzarse ese tiempo, el próximo request de usuario nos llevará al formulario de login.

Al desloguearse, se muestra una vista con el mensaje de 'Hasta luego' más el nombre y se retorna automáticamente, luego de dos segundos, a la vista de login de usuario.

La solución entregada hace persistir las sesiones de usuario en Mongo Atlas.
