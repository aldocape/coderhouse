// El cliente está armando el túnel con el server
// Concepto de handshake
const socket = io.connect();

socket.emit('bienvenida', {
  msg: 'Hola estás en la app de web sockets',
});

// Recibo evento 'cargarListado' desde el server
socket.on('cargarListado', () => {
  fetch('/api/productos')
    .then((res) => res.json())
    .then((json) => {
      if (json.products.length) {
        // Como productsList contiene no sólo al listado de productos sino también el mensaje 'No hay productos', entonces
        // cuando tengo elementos para mostrar, me aseguro de eliminar primero la capa que contiene el texto 'No hay productos'
        const productAux = document.querySelector('.productsList');
        productAux.remove();
        // Creo un nuevo div con la clase 'productsList' para mantener la estructura original del html
        const productList = document.createElement('div');
        productList.classList.add('productsList');

        json.products.forEach((product) => {
          // Creo un elemento 'div' para cada elemento que recorro del array
          productList.innerHTML += `<div class='columns row w-100'><div class='column p-2'>${product.title}</div><div class='column p-2'>${product.price}</div><div class='column p-2'><img src='${product.thumbnail}'</div></div>`;
        });

        //Agrego fila de encabezado de la tabla, al div contenedor
        const divContenido = document.querySelector('.contenido');
        divContenido.innerHTML =
          "<div class='panel-block is-flex-wrap-wrap'><div class='columns row w-100'><div class='column p-2'>Nombre</div><div class='column p-2'>Precio</div><div class='column p-2'>Foto</div></div></div>";

        // Agrego al div contenedor el listado de productos en forma de tabla
        divContenido.appendChild(productList);
      }
    });
});

// socket.emit('dataParaListado', { json.products }

socket.on('respuesta', (dataRecibidadesdeElServer) => {
  console.log(
    `El server me respondió con ${JSON.stringify(dataRecibidadesdeElServer)}`
  );
});

socket.on('respuestaList', (products) => {
  const productList = document.querySelector('.productsList');

  products.data.forEach((product) => {
    productList.innerHTML += `<div class='column p-2'>${product.title}</div><div class='column p-2'>${product.price}</div><div class='column p-2'><img src='${product.thumbnail}'</div>`;
  });
});
