// Obtengo del DOM inputs y forms que usaré en las funciones de abajo
const productForm = document.getElementById('product-form');

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
  });
});
