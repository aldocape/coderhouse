export default class MessagesDTO {
  id: string;
  time: string;
  text: string;
  author: {
    email: string;
    avatar: string;
  };

  constructor(data: any, esMongo: boolean) {
    if (esMongo) this.id = data._id;
    else this.id = data.id;
    this.time = data.time;
    this.text = data.text;
    this.author = {
      email: data.author.email,
      avatar: data.author.avatar,
    };
  }
}
