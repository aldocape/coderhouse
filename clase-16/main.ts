// Obtengo del DOM inputs y forms que usaré en las funciones de abajo
const inputEmail: HTMLElement | null = document.getElementById('userEmail');
const inputMessage: HTMLElement | null = document.getElementById('userMessage');
const chatForm: HTMLElement | null = document.getElementById('chat-form');
const productForm: HTMLElement | null = document.getElementById('product-form');

// Al iniciar la aplicación, hago 'fetch' desde el front, para mostrar todos los productos y todos los mensajes guardados en los archivos correspondientes
// Lo hago de esta manera porque todo se procesa en una sola vista, y entonces así puedo acceder a las api y emitir o escuchar eventos de socket
fetch('/api/productos')
  .then((res) => res.json())
  .then((json) => {
    // Obtengo del DOM la capa contenedora de la tabla
    const divTabla: HTMLElement | null = document.getElementById('tabla');

    if (divTabla)
      if (json.products && json.products.length) {
        // Si hay productos, agrego la primera fila de encabezado de la tabla
        divTabla.innerHTML = `<div class='columns row w-100'><div class='column p-2'>Nombre</div><div class='column p-2'>Precio</div><div class='column p-2'>Foto</div></div>`;

        // Genero una fila por cada producto que traje de la API, agregándolo con innerHTML
        json.products.forEach((product) => {
          // Creo un elemento 'div' para cada elemento que recorro del array
          divTabla.innerHTML += `<div class='columns row w-100'><div class='column p-2'>${product.title}</div><div class='column p-2'>${product.price}</div><div class='column p-2'><img src='${product.thumbnail}'</div></div>`;
        });
      } else {
        // Si no hay productos para mostrar, agrego html con este texto a la div contenedora
        divTabla.innerHTML += `<h3>No hay productos para mostrar</h3>`;
      }
  });

// Función fetch que al igual que la anterior, se ejecuta una sola vez y luego se hace todo con socket y manejo del DOM
fetch('/api/mensajes')
  .then((res) => res.json())
  .then((json) => {
    // Si la API de mensajes me trajo resultados, los muestro dentro de la capa .chat-messages
    if (json.messages && json.messages.length) {
      const chatMessages: HTMLElement | null =
        document.querySelector('.chat-messages');
      if (chatMessages)
        json.messages.forEach((message) => {
          chatMessages.innerHTML += `<p><span class='negritaAzul'>${message.user}</span> [<span class='normalMarron'>${message.time}</span>] : <span class='italicVerde'>${message.text}</span></p>`;
        });
    }
  });

// Función que utilizo para poder acceder a la API usando POST, porque da error usando res.render en el endpoint 'POST' de la API
async function guardarEnBD(endpoint = '/productos', body: any) {
  if (body) {
    body = JSON.stringify(body);
  }

  const headers = {
    'Content-type': 'application/json',
  };

  const response = await fetch(`/api${endpoint}`, {
    method: 'POST',
    body,
    headers,
  });

  const data = await response.json();

  return data;
}

// Armo el túnel con el server (Handshake)
// const socket = io.connect();

// Listener para escuchar el 'Submit' desde el formulario de productos
if (productForm)
  productForm.addEventListener('submit', (event) => {
    event.preventDefault();

    // Obtengo datos de los input del form
    const title = (<HTMLInputElement>document.getElementById('title')).value;
    const price = (<HTMLInputElement>document.getElementById('price')).value;
    const thumbnail = (<HTMLInputElement>document.getElementById('thumbnail'))
      .value;

    // Creo un objeto con los datos obtenidos
    const newProduct = {
      title,
      price,
      thumbnail,
    };

    // Hago un 'POST' a la API usando el endpoint de productos y le paso el objeto nuevo
    guardarEnBD('/productos', newProduct).then((data) => {
      // Obtengo del DOM una capa invisible del formulario, que uso para mostrar mensajes de error si los hubiera
      const divProd: HTMLElement | null = document.getElementById('msgProd');
      // Si salió todo bien, se va a mostrar un mensaje de que se guardó correctamente, sino mostrará cuál es el error
      if (divProd) divProd.innerHTML = data.msg;

      if (data.success) {
        // Si todo salió bien, emite un evento 'newProduct' al server
        // socket.emit('newProduct', newProduct);
      }
    });
  });

// Recibo un evento de mensaje de chat desde el server
// socket.on('eventMessage', (message) => {
//   // Muestro el mensaje usando el DOM, y dejo el foco en el input para poder seguir mandando mensajes
//   ouputMessage(message);
//   if (inputMessage) inputMessage.focus();
// });

// Recibo un evento de nuevo Producto desde el server
// socket.on('eventProduct', (product) => {
//   // Muestro el nuevo producto al final de la tabla, usando el DOM
//   outputProduct(product);
// });

// Función que escucha el 'Submit' del formulario del centro de mensajes
if (chatForm)
  chatForm.addEventListener('submit', (event) => {
    event.preventDefault();

    // Obtiene el texto del campo e-mail del formulario de chat
    const userEmail = (<HTMLInputElement>document.getElementById('userEmail'))
      .value;
    // const userEmail = event.target.elements.userEmail.value;

    // Obtiene el texto del campo mensaje del formulario de chat
    const userMessage = (<HTMLInputElement>(
      document.getElementById('userMessage')
    )).value;
    // const userMessage = event.target.elements.userMessage.value;

    // Creo un objeto con los datos obtenidos
    const userMsg = {
      userEmail,
      userMessage,
    };

    // Uso la función guardarEnBD para hacer 'POST' a la API de mensajes, enviándole el objeto nuevo
    guardarEnBD('/mensajes', userMsg).then((data) => {
      const divChat = document.getElementById('msgChat');
      if (divChat)
        if (data.success) {
          divChat.innerHTML = '';
          // Emite un evento 'chatMessage' al server
          //   socket.emit('chatMessage', userMsg);
        } else {
          // Si hubo un error, lo muestro en la capa ubicada debajo del input para enviar mensajes
          divChat.innerHTML = data.msg;
        }
    });

    // Limpio el input de mensaje y le hago foco
    inputMessage?.focus();
    // event.target.elements.userMessage.value = '';
    // event.target.elements.userMessage.focus();
  });

// Función para renderizar el nuevo producto usando el DOM
function outputProduct(product) {
  const divTabla = document.getElementById('tabla');
  if (divTabla)
    divTabla.innerHTML += `<div class='columns row w-100'><div class='column p-2'>${product.title}</div><div class='column p-2'>${product.price}</div><div class='column p-2'><img src='${product.thumbnail}'</div></div>`;
}

// Función para renderizar el nuevo mensaje de chat usando el DOM
function ouputMessage(message) {
  // Creo un nodo 'p' y se lo agrego como nodo hijo de la capa .chat-messages
  const p1 = document.createElement('p');
  p1.innerHTML = `<span class='negritaAzul'>${message.user}</span> [<span class='normalMarron'>${message.time}</span>] : <span class='italicVerde'>${message.text}</span>`;

  const chatElement = document.querySelector('.chat-messages');
  if (chatElement) chatElement.appendChild(p1);
}
