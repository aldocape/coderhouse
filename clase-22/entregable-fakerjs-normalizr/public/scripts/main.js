// Obtengo del DOM inputs y forms que usaré en las funciones de abajo
const inputEmail = document.getElementById('userEmail');
const inputMessage = document.getElementById('userMessage');
const chatForm = document.getElementById('chat-form');

let hayProductos = true;
// Al iniciar la aplicación, hago 'fetch' desde el front, para mostrar todos los productos y todos los mensajes guardados en los archivos correspondientes
// Lo hago de esta manera porque todo se procesa en una sola vista, y entonces así puedo acceder a las api y emitir o escuchar eventos de socket
fetch('/api/productos-test')
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
                <h5 class="card-title">Nombre del producto: ${product.nombre}</h5>
                <p class="card-text">
                  Descripción: ${product.descripcion}
                </p>
                <p class="card-text">Código: ${product.codigo}</p>
                <p class="card-text">Precio: $${product.precio}</p>
                <p class="card-text">Timestamp: ${product.timestamp}</p>
                <p class="card-text">Stock: ${product.stock}</p>
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
    if (messages.success) {
      console.log(`Data original: `, messages.messages);
      const chatMessages = document.querySelector('.chat-messages');

      messages.messages.forEach((message) => {
        chatMessages.innerHTML += `<p><span class='negritaAzul'>${message.author.email}</span> [<span class='normalMarron'>${message.time}</span>] : <span class='italicVerde'>${message.text}</span></p>`;
      });

      chatMessages.innerHTML += `<h2 style = "margin: 40px 0">Objeto mensajes sin normalizar: <h2>`;
      chatMessages.innerHTML += `<h3 style = "margin: 20px 0">Tamaño del archivo: ${messages.tamanio} <h3>`;
      chatMessages.innerHTML += `<p>${JSON.stringify(messages.messages)}</p>`;
    }
  });

fetch('/api/mensajes/normalized')
  .then((res) => res.json())
  .then((messages) => {
    // Si la API de mensajes me trajo resultados, los muestro dentro de la capa .chat-messages

    if (messages.success) {
      console.log(`Datos normalizados: `, messages.messages);
      const chatMessages = document.querySelector('.chat-messages-normalized');

      chatMessages.innerHTML += `<h2 style = "margin: 40px 0">Objeto mensajes normalizado: <h2>`;
      chatMessages.innerHTML += `<h3 style = "margin: 20px 0">Tamaño del archivo: ${messages.tamanio} <h3>`;
      chatMessages.innerHTML += `<h3 style = "margin: 20px 0">Porcentaje de compresión: ${
        100 - (messages.tamanio / messages.tamanioOriginal) * 100
      }<h3>`;
      chatMessages.innerHTML += `<p>${JSON.stringify(messages.messages)}</p>`;
    }
  });

fetch('/api/mensajes/desnormalized')
  .then((res) => res.json())
  .then((messages) => {
    // Si la API de mensajes me trajo resultados, los muestro dentro de la capa .chat-messages

    if (messages.success) {
      console.log(`Datos desnormalizados: `, messages.messages);
      const chatMessages = document.querySelector(
        '.chat-messages-desnormalized'
      );

      chatMessages.innerHTML += `<h2 style = "margin: 40px 0">Objeto mensajes desnormalizado: <h2>`;
      chatMessages.innerHTML += `<h3 style = "margin: 20px 0">Tamaño del archivo: ${messages.tamanio} <h3>`;
      chatMessages.innerHTML += `<p>${JSON.stringify(messages.messages)}</p>`;
    }
  });
