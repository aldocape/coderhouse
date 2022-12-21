// Obtengo del DOM inputs y forms que usaré en las funciones de abajo
const inputEmail = document.getElementById('userEmail');
const inputMessage = document.getElementById('userMessage');
const chatForm = document.getElementById('chat-form');
const productForm = document.getElementById('product-form');

// Armo el túnel con el server (Handshake)
const socket = io.connect();

// Función que utilizo para poder acceder a la API usando POST
async function guardarEnBD(endpoint = '/api/productos', body = undefined) {
  if (body) {
    body = JSON.stringify(body);
  }

  const headers = {
    'Content-type': 'application/json',
  };

  const response = await fetch(`${endpoint}`, {
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
  guardarEnBD('/api/productos', newProduct).then((data) => {
    // Obtengo del DOM una capa invisible del formulario, que uso para mostrar mensajes de error si los hubiera
    const divProd = document.getElementById('msgProd');

    if (data.newProd) {
      divProd.innerHTML = '';

      // Emite un evento 'newProduct' al server
      socket.emit('newProduct', data.newProd);
    }

    // Si salió todo bien, se va a mostrar un mensaje de que se guardó correctamente, sino mostrará cuál es el error
    divProd.innerHTML = data.msg;
  });
});

let hayProductos = true;

// Función fetch para traer los mensajes almacenados en la DB cuando se carga el sitio
fetch('/api/productos')
  .then((res) => res.json())
  .then((products) => {
    if (products && products.length) {
      // Genero una fila por cada producto que traje de la API, agregándolo con innerHTML dentro de outputProduct
      products.forEach((product) => {
        outputProduct(product);
      });
    } else {
      // Si no hay productos para mostrar, agrego html con este texto a la div contenedora
      const divTabla = document.getElementById('tabla');
      divTabla.innerHTML += `<h3>No hay productos para mostrar</h3>`;
      hayProductos = false;
    }
  });

// Función fetch para traer los mensajes almacenados en la DB cuando se carga el sitio
fetch('/api/mensajes')
  .then((res) => res.json())
  .then((messages) => {
    // Si la API de mensajes me trajo resultados, los muestro dentro de la capa .chat-messages
    if (messages.messages) {
      // console.log(`Data original: `, messages.messages);
      const chatMessages = document.querySelector('.chat-messages');

      messages.messages.forEach((message) => {
        outputMessage(message);
      });

      // chatMessages.innerHTML += `<h2 style = "margin: 40px 0">Objeto mensajes sin normalizar: <h2>`;
      // chatMessages.innerHTML += `<h3 style = "margin: 20px 0">Tamaño del archivo: ${messages.tamanio} <h3>`;
      // chatMessages.innerHTML += `<p>${JSON.stringify(messages.messages)}</p>`;
    }
  });

// Recibo un evento de nuevo mensaje de chat desde el server
socket.on('eventMessage', (message) => {
  // Muestro el mensaje usando el DOM, y dejo el foco en el input para poder seguir mandando mensajes
  outputMessage(message);
  inputMessage.focus();
});

// Recibo un evento de nuevo Producto desde el server
socket.on('eventProduct', (product) => {
  // Muestro el nuevo producto al final de la tabla, usando el DOM
  productForm.reset();
  outputProduct(product);
});

// Función que escucha el 'Submit' del formulario del centro de mensajes
chatForm.addEventListener('submit', (event) => {
  event.preventDefault();

  // Obtengo textos de campos e-mail y mensaje del formulario de chat
  const email = event.target.elements.userEmail.value;
  const nombre = event.target.elements.firstName.value;
  const apellido = event.target.elements.lastName.value;
  const edad = event.target.elements.age.value;
  const alias = event.target.elements.alias.value;
  const avatar = event.target.elements.avatar.value;
  const text = event.target.elements.userMessage.value;

  // Creo un objeto con los datos obtenidos
  const userMsg = {
    author: {
      email,
      nombre,
      apellido,
      edad,
      alias,
      avatar,
    },
    text,
  };

  // Uso la función guardarEnBD para hacer 'POST' a la API de mensajes, enviándole el objeto nuevo
  guardarEnBD('/api/mensajes', userMsg).then((data) => {
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

// Función para renderizar productos usando el DOM
function outputProduct(product) {
  const divTabla = document.getElementById('tabla');

  if (!hayProductos) {
    divTabla.innerHTML = ``;
    hayProductos = true;
  }

  divTabla.innerHTML += `
  <div class="col-sm-4">
    <div class="card mt-4">
      <img
        class="card-img-top"
        src="${product.foto}"
        alt="Imagen del producto"
        style="max-height: 280"
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
}

// Función para renderizar el nuevo mensaje de chat usando el DOM
function outputMessage(message) {
  // Creo un nodo 'p' y se lo agrego como nodo hijo de la capa .chat-messages
  const p1 = document.createElement('p');
  p1.innerHTML = `<span style="margin-right:5px"><img width='50' src='${message.author.avatar}' alt='user_avatar'></span><span class='negritaAzul'>${message.author.email}</span> [<span class='normalMarron'>${message.time}</span>] : <span class='italicVerde'>${message.text}</span>`;

  document.querySelector('.chat-messages').appendChild(p1);
}

// Obtengo el botón de logout
const btnLogout = document.getElementById('btnLogout');

btnLogout.addEventListener('click', (event) => {
  event.preventDefault();

  document.location.href = '/logout';
});
