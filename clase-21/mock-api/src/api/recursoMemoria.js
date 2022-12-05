import { faker } from '@faker-js/faker';

class RecursoMemoria {
  constructor() {
    this.data = [];
  }

  findIndex(id) {
    return this.data.findIndex((elem) => elem.id == id);
  }

  get(id = undefined) {
    if (id) {
      return this.data.filter((elem) => elem.id == id);
    }
    return this.data;
  }

  post() {
    this.data.push({
      id: this.data.length + 1,
      nombre: faker.name.firstName(),
      email: faker.internet.email(),
      website: faker.internet.url(),
      image: faker.image.avatar(),
    });
  }

  delete(id) {
    const user = this.findIndex(id);
    this.data.splice(user, 1);
  }
}

export const RecursoEnMemoria = new RecursoMemoria();
