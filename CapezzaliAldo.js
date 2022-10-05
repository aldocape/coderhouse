class Usuario {
  // Atributos de la clase Usuario

  libros = [];
  mascotas = [];
  constructor(nombre, apellido, edad) {
    this.nombre = nombre;
    this.apellido = apellido;
  }

  // Métodos de la clase Usuario

  getFullName() {
    // Devuelve nombre y apellido del usuario, separado por un espacio en blanco
    return `${this.nombre} ${this.apellido}`;
  }
  addMascota(mascota) {
    // Recibe el nombre de una mascota y lo agrega al array de mascotas
    this.mascotas.push(mascota);
  }
  countMascotas() {
    // Devuelve la cantidad de mascotas del array
    return this.mascotas.length;
  }
  // Recibe nombre de un libro y autor del mismo, y lo agrega al array de libros
  addBook(nombre, autor) {
    this.libros.push({
      nombre: nombre,
      autor: autor,
    });
  }
  getBookNames() {
    // Retorna un array sólo con los nombres del array de libros del usuario
    const nuevoArray = this.libros.map((libro) => {
      return libro.nombre;
    });
    return nuevoArray;
  }
}

// Creo una instancia de la clase, y guardo en una constante llamada 'aldo'
const aldo = new Usuario('Aldo', 'Capezzali');

// Obtengo apellido y nombre completos del usuario 'aldo'
const nombreCompleto = aldo.getFullName();
console.log(nombreCompleto);

// Agrego 3 mascotas para 'aldo'
aldo.addMascota('Perro');
aldo.addMascota('Gato');
aldo.addMascota('Canario');

// Muestro la cantidad de mascotas que tiene 'aldo' usando la función countMascotas
console.log(`La cantidad de mascotas es ${aldo.countMascotas()}`);

// Agrego libros a la colección de 'aldo'
aldo.addBook('Martín Fierro', 'José Hernandez');
aldo.addBook('Asesinato en Mesopotamia', 'Agatha Christie');
aldo.addBook('Otelo', 'William Shakespeare');

// Muestro un listado que contiene únicamente los nombres de los libros de 'aldo'
const nombresDeLibros = aldo.getBookNames();
console.log(nombresDeLibros);

// Muestro el objeto 'aldo'
console.log(aldo);
