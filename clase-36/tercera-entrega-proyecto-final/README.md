# Tercera Entrega del Proyecto Final

Se ha implementado un formulario de registro y otro de autenticación de usuarios basado en passport local, guardando en la base de datos las credenciales y el resto de los datos ingresados al momento del registro.
Por cada nuevo usuario, se agregará un registro que contiene el email y password de usuario, además de su nombre, dirección, edad, número de teléfono y foto ó avatar. La contraseña se almacenará encriptada en la base de datos.

Una vez concretada la operación de registro, se muestra un mensaje indicando que el usuario ya puede ingresar a la 'home' con sus datos de autenticación (email y password).

Al ingresar, contará con un menú en su vista, a modo de barra de navegación. Esto le permitirá ver los productos totales y su propio carrito de compras e información propia (datos de registro con la foto). Además, dispone de una opción para desloguearse del sistema.

(Función para obtener carrito en el front, en public/js/main.js, línea 86)

Ante la incorporación de un usuario, el servidor envía un email al administrador con todos los datos de registro y asunto 'nuevo registro', a una dirección que se encuentra por el momento almacenada en una constante global.

(En el archivo 'routes/login.ts' está la lógica de envío de mail al administrador - ver endpoint '/signup', método 'POST')

Importante:

Variables de entorno:

MONGO_ATLAS_URL: Contiene el string de conexión a la base de datos de Mongo Atlas

GMAIL_EMAIL: Contiene el E-Mail del administrador del sistema

GMAIL_PASSWORD: Contiene el password que brinda Google para el envío de mail con Nodemailer

GMAIL_NAME: Contiene el nombre del administrador del sistema

SID: Contiene el Account SID de Twilio

TOKEN: Contiene el Auth Token de Twilio

CEL: Contiene el número del Sandbox de Twilio para WhatsApp (ej: whatsapp:+1 234 567 8889)

ADMIN_CEL: Contiene el número de teléfono del Admin

TWILIO_CELLPHONE: Contiene el Twilio phone number de nuestra cuenta de Twilio

Para hacer una compra de varios productos, el usuario hace clic en el checkBox que dice 'Agregar al carrito', en ese momento se muestra un campo de texto para ingresar la cantidad que se va a comprar. Se pueden seleccionar varios productos con las cantidades que se desee, hasta que esté implementado el módulo de manejo de stock. Luego de seleccionar los productos y las cantidades deseadas, haciendo clic en el botón 'Confirmar carrito', se hacen varias operaciones:

- Se crea un nuevo carrito (Endpoint '/api/carrito/', método 'POST') que lo crea en la Base de Datos, arma el cuerpo del mail con los datos que recibe del front y lo envía, arma el texto para el mensaje de Whatsapp y lo envía al admin, y envía también el texto que le indica al usuario que su pedido está siendo procesado. Para ello, en este script se importan las funcionalidades de twilio y nodemailer (ruta 'src/routes/carts').

Configuración de nodemailer: En ruta 'src/services/email.ts'
Configuración de twilio: En ruta 'src/controller/twilio.ts'
Lógica de envío de mail: en ruta 'src/routes/email.ts'

- El script main.js (ruta public/js/main.js), que viene a ser el 'puente' entre el front y el back, luego de crear el nuevo carrito llama a la api de usuario en la línea 180 para que este carrito quede vinculado al usuario que lo generó. Por el momento, cada vez que el usuario cambie su carrito y ponga 'Confirmar carrito', se irá generando uno nuevo que se vincula al usuario, en lugar de modificar el carrito en si, lo que no se pudo hacer por falta de tiempo, pero como no se exige en el entregable, opté por hacerlo de esta forma. También se actualiza en tiempo real la info del carrito del usuario, mediante el uso de Websockets.

_Importante: Websockets no funciona cuando el servidor inicia en modo 'cluster', porque hay que hacer alguna configuración extra que desconozco, pero en modo 'fork' funciona todo bien. En el package.json está el script "start" configurado para iniciar en modo "cluster"._

Se ha implementado winston como logger para poder así reemplazar todos los mensajes a consola por logs de manera eficiente hacia la misma consola. En el caso de errores moderados ó graves el log tendrá además como destino un archivo elegido (ruta 'logs/error.log' en el caso de error y ruta 'logs/warn.log' en el caso de un warn).
