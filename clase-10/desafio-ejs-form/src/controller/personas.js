const { v4: uuidv4 } = require('uuid');

class Personas {
  constructor() {
    this.personas = [
      // { id: uuidv4(), nombre: 'Aldo', apellido: 'Capezzali', edad: 40 },
      // { id: uuidv4(), nombre: 'Santino', apellido: 'Capezzali', edad: 13 },
      // { id: uuidv4(), nombre: 'Iara Sofía', apellido: 'Capezzali', edad: 7 },
    ];
  }

  getAll() {
    return this.personas;
  }

  save(data) {
    const nuevaPersona = {
      id: uuidv4(),
      nombre: data.nombre,
      apellido: data.apellido,
      edad: data.edad,
    };
    this.personas.push(nuevaPersona);
  }
}

const personasController = new Personas();

module.exports = personasController;
