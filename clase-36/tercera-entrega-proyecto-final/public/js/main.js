// Obtengo del DOM inputs y forms que usaré en las funciones de abajo
const inputEmail = document.getElementById('userEmail');
const inputMessage = document.getElementById('userMessage');
const chatForm = document.getElementById('chat-form');
const productForm = document.getElementById('product-form');
const productListForm = document.getElementById('product-list-form');
const datos_carrito = document.getElementById('datos_carrito');

// Armo el túnel con el server (Handshake)
const socket = io.connect();

// Función que utilizo para poder acceder a la API usando los verbos GET, POST y PUT
async function requestHandler(
  endpoint = '/api/productos',
  method = 'POST',
  body = undefined
) {
  if (body) {
    body = JSON.stringify(body);
  }

  const headers = {
    'Content-type': 'application/json',
  };

  const response = await fetch(`${endpoint}`, {
    method,
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
  requestHandler('/api/productos', 'POST', newProduct).then((data) => {
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

function verificarCheck(id) {
  const checkBox = document.getElementById(id);
  const field = document.getElementById(`input_${id}`);
  if (checkBox.checked) field.style.display = 'block';
  else field.style.display = 'none';
}

// Función fetch para traer el carrito del usuario
requestHandler(
  `/api/carrito/${document.getElementById('carrito_id').value}/productos`,
  'GET'
)
  .then((response) => {
    if (response.success) {
      const carrito = response.cart;
      if (carrito.productos.length) {
        datos_carrito.innerHTML =
          'Su carrito de compras tiene los siguientes elementos:<br /><br />';
        let nombre = '';
        let cantidad = 0;
        for (let i = 0; i < carrito.productos.length; i++) {
          const producto = carrito.productos[i].nombre;
          if (nombre !== producto) {
            if (nombre) {
              datos_carrito.innerHTML += `&#x25cb;&nbsp;&nbsp;${nombre} - Cantidad: ${cantidad}<br />`;
              cantidad = 1;
            } else {
              cantidad++;
            }
            nombre = producto;
          } else {
            cantidad++;
          }
          if (i == carrito.productos.length - 1) {
            datos_carrito.innerHTML += `&#x25cb;&nbsp;&nbsp;${nombre} - Cantidad: ${cantidad}<br />`;
          }
        }
        datos_carrito.style.display = 'block';
      }
    } else {
      // Si el usuario aún no creó un carrito de compras, muestro ese mensaje en el div "datos_carrito"
      datos_carrito.innerHTML += `<p>Usted no tiene productos en su carrito de compras</p>`;
      datos_carrito.style.display = 'block';
    }
  })
  .catch((err) => {
    datos_carrito.innerHTML += `<p>Usted no tiene productos en su carrito de compras</p>`;
    datos_carrito.style.display = 'block';
  });

// Función fetch para traer los mensajes almacenados en la DB cuando se carga el sitio
requestHandler('/api/productos', 'GET').then((products) => {
  if (products && products.length) {
    // Genero una fila por cada producto que traje de la API, agregándolo con innerHTML dentro de outputProduct
    // const cartCheck = [];
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

// Listener para escuchar el 'Submit' de confirmar carrito en lista de productos
productListForm.addEventListener('submit', (event) => {
  event.preventDefault();

  // Obtengo datos de los checkbox que estén en "checked"

  const checkBoxs = document.getElementsByClassName('carritoCheck');

  const productsCart = [];
  for (let check of checkBoxs) {
    if (check.checked) {
      productsCart.push({
        id: check.id,
        nombre: document.getElementById(`input_nombre_${check.id}`).value,
        cantidad: document.getElementById(`input_cant_${check.id}`).value,
      });
    }
  }

  // // Hago un 'POST' a la API usando el endpoint de carrito y le paso el objeto nuevo
  requestHandler('/api/carrito', 'POST', productsCart).then(async (data) => {
    // Obtengo del DOM una capa invisible del formulario, que uso para mostrar mensajes de error si los hubiera
    const divCart = document.getElementById('msgCart');

    if (data.newCart) {
      // Si salió todo bien, se va a mostrar un mensaje de que se guardó correctamente, sino mostrará cuál es el error
      divCart.innerHTML = data.msg;

      // Emite un evento 'newCart' al server
      socket.emit('newCart', productsCart);

      const userData = {
        carrito: data.newCart._id,
      };

      // Actualizo el usuario y lo vinculo con el carrito
      await requestHandler(
        `/api/usuarios/${document.getElementById('user_id').value}`,
        'PUT',
        userData
      );
    }
  });
});

//-------------------------------------------------------------------------------------

// MENSAJES

/* --------------------- NORMALIZACIÓN DE MENSAJES ---------------------------- */

const author = new normalizr.schema.Entity(
  'author',
  {},
  {
    idAttribute: 'email',
  }
);

const message = new normalizr.schema.Entity(
  'message',
  { author: author },
  {
    idAttribute: '_id',
  }
);

const finalSchema = [message];

// /* ----------------------------------------------------------------------------- */

// Función fetch para traer los mensajes almacenados en la DB cuando se carga el sitio
requestHandler('/api/mensajes/normalized', 'GET').then((messages) => {
  // Si la API de mensajes me trajo resultados, los muestro dentro de la capa .chat-messages
  if (messages.messages) {
    const chatMessages = document.querySelector('.chat-messages');

    const mensajesNormalized = messages.messages;

    // Calculo el tamaño de los mensajes normalizados
    const tamanioMensajes = JSON.stringify(mensajesNormalized).length;

    const mensajesDesnormalizados = normalizr.denormalize(
      mensajesNormalized.result,
      finalSchema,
      mensajesNormalized.entities
    );

    // Calculo el tamaño de los mensajes desnormalizados
    const tamanioMensajesDesnormalizados = JSON.stringify(
      mensajesDesnormalizados
    ).length;

    // Calculo el porcentaje de compresión y lo muestro al lado del título del centro de mensajes
    const porcentajeCompresion = parseInt(
      (tamanioMensajes * 100) / tamanioMensajesDesnormalizados
    );

    const tituloCentroMensajes = document.getElementById(
      'titulo_centro_mensajes'
    );
    tituloCentroMensajes.innerText += ` (Porcentaje de compresión ${
      100 - porcentajeCompresion
    }%)`;

    // Creo un objeto 'plantilla' al que le voy guardando los datos dentro del 'for'
    const messageList = {
      author: {
        avatar: '',
        email: '',
      },
      time: '',
      text: '',
    };

    // Muestro los mensajes en el chat desde el objeto de normalizados
    for (const key in mensajesNormalized.result) {
      const item =
        mensajesNormalized.entities.message[mensajesNormalized.result[key]]; // devuelve author, text, time

      messageList.author.avatar =
        mensajesNormalized.entities.author[item.author].avatar;
      messageList.author.email = item.author;
      messageList.time = item.time;
      messageList.text = item.text;

      outputMessage(messageList);
    }

    // messages.messages.forEach((message) => {
    //   outputMessage(message);
    // });

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

// Recibo un evento de nuevo carrito desde el server
socket.on('eventCart', (cart) => {
  // Muestro el nuevo carrito manipulando el DOM
  outputCart(cart);
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

  // Uso la función requestHandler para hacer 'POST' a la API de mensajes, enviándole el objeto nuevo
  requestHandler('/api/mensajes', 'POST', userMsg).then((data) => {
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
    <div class="card mt-4 prod-item">
    <input type="hidden" id="input_nombre_${product._id}" value="${product.nombre}" />
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
        
        <p class="card-text"><input type="checkbox" id="${product._id}" class="carritoCheck" onclick="verificarCheck('${product._id}')" />&nbsp;&nbsp;Agregar al carrito</p>
        <p class="card-text" id="input_${product._id}" style="display:none">
        Hola soy el producto ${product._id}<br />
        Cantidad:&nbsp;&nbsp;<input type="number" id="input_cant_${product._id}" />
        
        </p>
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

// Función para renderizar el nuevo carrito usando el DOM
function outputCart(cart) {
  let text =
    'Su carrito de compras tiene los siguientes elementos:<br /><br />';
  for (let i = 0; i < cart.length; i++) {
    text += `&#x25cb;&nbsp;&nbsp;${cart[i].nombre} - Cantidad: ${cart[i].cantidad}<br />`;
  }
  datos_carrito.innerHTML = text;
}

// Obtengo el botón de logout
const btnLogout = document.getElementById('btnLogout');

btnLogout.addEventListener('click', (event) => {
  event.preventDefault();

  document.location.href = '/logout';
});

// const inputUsername = document.getElementById('username') // inputEmail
// const inputMensaje = document.getElementById('inputMensaje') // inputMessage
// const btnEnviar = document.getElementById('btnEnviar')

// const formPublicarMensaje = document.getElementById('formPublicarMensaje')
// chatForm.addEventListener('submit', e => {
//     e.preventDefault()

//     const mensaje = {
//         author: {
//             email: inputUsername.value,
//             nombre: document.getElementById('firstname').value,
//             apellido: document.getElementById('lastname').value,
//             edad: document.getElementById('age').value,
//             alias: document.getElementById('alias').value,
//             avatar: document.getElementById('avatar').value
//         },
//         text: inputMensaje.value
//     }

//     socket.emit('nuevoMensaje', mensaje);
//     formPublicarMensaje.reset()
//     inputMensaje.focus()
// })
