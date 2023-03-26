export default class MessagesDTO {
  id: string;
  time: string;
  message: string;
  user: {
    username: string;
    nombre: string;
  };

  constructor(data: any, esMongo: boolean) {
    if (esMongo) this.id = data._id;
    else this.id = data.id;
    this.time = data.time;
    this.message = data.message;
    this.user = {
      username: data.user.username,
      nombre: data.user.nombre,
    };
  }
}
