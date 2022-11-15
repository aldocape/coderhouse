// Obtengo del DOM inputs y forms que usaré en las funciones de abajo
const inputEmail = document.getElementById('userEmail');
const inputMessage = document.getElementById('userMessage');
const chatForm = document.getElementById('chat-form');
const productForm = document.getElementById('product-form');

let hayProductos = true;
// Al iniciar la aplicación, hago 'fetch' desde el front, para mostrar todos los productos y todos los mensajes guardados en los archivos correspondientes
// Lo hago de esta manera porque todo se procesa en una sola vista, y entonces así puedo acceder a las api y emitir o escuchar eventos de socket
fetch('/api/productos')
  .then((res) => res.json())
  .then((products) => {
    // Obtengo del DOM la capa contenedora de la tabla

    const divTabla = document.getElementById('tabla');

    if (products && products.length) {
      // Si hay productos, agrego la primera fila de encabezado de la tabla
      // divTabla.innerHTML = `<div class='columns row w-100'><div class='column p-2'>Nombre</div><div class='column p-2'>Precio</div><div class='column p-2'>Foto</div></div>`;

      // Genero una fila por cada producto que traje de la API, agregándolo con innerHTML
      products.forEach((product) => {
        // Creo un elemento 'div' para cada elemento que recorro del array
        divTabla.innerHTML += `
          <div class="col-sm-4">
            <div class="card">
              <img
                class="card-img-top"
                src="${product.foto}"
                alt="Imagen del producto"
              />
              <div class="card-body">
                <h5 class="card-title">${product.nombre}</h5>
                <p class="card-text">
                  ${product.descripcion}
                </p>
                <p class="card-text">Precio: $${product.precio}</p>
              </div>
            </div>
          </div>`;

        // divTabla.innerHTML += `<div class='columns row w-100'><div class='column p-2'>${product.nombre}</div><div class='column p-2'>${product.precio}</div><div class='column p-2'><img width="300" src='${product.foto}'</div></div>`;
      });
    } else {
      // Si no hay productos para mostrar, agrego html con este texto a la div contenedora
      divTabla.innerHTML += `<h3>No hay productos para mostrar</h3>`;
      hayProductos = false;
    }
  });

// Función fetch que al igual que la anterior, se ejecuta una sola vez y luego se hace todo con socket y manejo del DOM
fetch('/api/mensajes')
  .then((res) => res.json())
  .then((messages) => {
    // Si la API de mensajes me trajo resultados, los muestro dentro de la capa .chat-messages
    if (messages && messages.length) {
      const chatMessages = document.querySelector('.chat-messages');

      messages.forEach((message) => {
        chatMessages.innerHTML += `<p><span class='negritaAzul'>${message.user}</span> [<span class='normalMarron'>${message.time}</span>] : <span class='italicVerde'>${message.text}</span></p>`;
      });
    }
  });

// Armo el túnel con el server (Handshake)
const socket = io.connect();

// función que utilizo para poder acceder a la API usando POST
async function guardarEnBD(endpoint = '/productos', body = undefined) {
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

// Listener para escuchar el 'Submit' desde el formulario de productos
productForm.addEventListener('submit', (event) => {
  event.preventDefault();

  // Obtengo datos de los input del form
  const nombre = document.getElementById('nombre');
  const descripcion = document.getElementById('descripcion');
  const codigo = document.getElementById('codigo');
  const foto = document.getElementById('foto');
  const precio = document.getElementById('precio');
  const stock = document.getElementById('stock');

  // Creo un objeto con los datos obtenidos
  const newProduct = {
    nombre: nombre.value,
    descripcion: descripcion.value,
    codigo: codigo.value,
    foto: foto.value,
    precio: precio.value,
    stock: stock.value,
  };

  // Hago un 'POST' a la API usando el endpoint de productos y le paso el objeto nuevo
  guardarEnBD('/productos', newProduct).then((data) => {
    // Obtengo del DOM una capa invisible del formulario, que uso para mostrar mensajes de error si los hubiera
    const divProd = document.getElementById('msgProd');
    // Si salió todo bien, se va a mostrar un mensaje de que se guardó correctamente, sino mostrará cuál es el error
    divProd.innerHTML = data.msg;

    if (data.newProd) {
      // Si todo salió bien, emite un evento 'newProduct' al server
      socket.emit('newProduct', newProduct);
    }
  });
});

// Recibo un evento de mensaje de chat desde el server
socket.on('eventMessage', (message) => {
  // Muestro el mensaje usando el DOM, y dejo el foco en el input para poder seguir mandando mensajes
  ouputMessage(message);
  inputMessage.focus();
});

// Recibo un evento de nuevo Producto desde el server
socket.on('eventProduct', (product) => {
  // Muestro el nuevo producto al final de la tabla, usando el DOM
  outputProduct(product);
});

// Función que escucha el 'Submit' del formulario del centro de mensajes
chatForm.addEventListener('submit', (event) => {
  event.preventDefault();

  // Obtiene el texto del campo e-mail del formulario de chat
  const userEmail = event.target.elements.userEmail.value;

  // Obtiene el texto del campo mensaje del formulario de chat
  const userMessage = event.target.elements.userMessage.value;

  // Creo un objeto con los datos obtenidos
  const userMsg = {
    user: userEmail,
    text: userMessage,
  };

  // Uso la función guardarEnBD para hacer 'POST' a la API de mensajes, enviándole el objeto nuevo
  guardarEnBD('/mensajes', userMsg).then((data) => {
    const divChat = document.getElementById('msgChat');

    if (data.newMsg) {
      divChat.innerHTML = '';

      // Emite un evento 'chatMessage' al server
      socket.emit('chatMessage', userMsg);
    } else {
      // Si hubo un error, lo muestro en la capa ubicada debajo del input para enviar mensajes
      divChat.innerHTML = data.msg;
    }
  });

  // Limpio el input de mensaje y le hago foco
  event.target.elements.userMessage.value = '';
  event.target.elements.userMessage.focus();
});

// Función para renderizar el nuevo producto usando el DOM
function outputProduct(product) {
  const divTabla = document.getElementById('tabla');

  if (hayProductos) {
    divTabla.innerHTML += `
  <div class="col-sm-4">
    <div class="card">
      <img
        class="card-img-top"
        src="${product.foto}"
        alt="Imagen del producto"
      />
      <div class="card-body">
        <h5 class="card-title">${product.nombre}</h5>
        <p class="card-text">
          ${product.descripcion}
        </p>
        <p class="card-text">Precio: $${product.precio}</p>
      </div>
    </div>
  </div>`;
  } else {
    divTabla.innerHTML = `
  <div class="col-sm-4">
    <div class="card">
      <img
        class="card-img-top"
        src="${product.foto}"
        alt="Imagen del producto"
      />
      <div class="card-body">
        <h5 class="card-title">${product.nombre}</h5>
        <p class="card-text">
          ${product.descripcion}
        </p>
        <p class="card-text">Precio: $${product.precio}</p>
      </div>
    </div>
  </div>`;
    hayProductos = true;
  }
}

// Función para renderizar el nuevo mensaje de chat usando el DOM
function ouputMessage(message) {
  // Creo un nodo 'p' y se lo agrego como nodo hijo de la capa .chat-messages
  const p1 = document.createElement('p');
  p1.innerHTML = `<span class='negritaAzul'>${message.user}</span> [<span class='normalMarron'>${message.time}</span>] : <span class='italicVerde'>${message.text}</span>`;

  document.querySelector('.chat-messages').appendChild(p1);
}
