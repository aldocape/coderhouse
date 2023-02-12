import { Mensaje } from '../interfaces';

export default class MessagesDTO {
  id: string;
  time: string;
  text: string;
  author: {
    email: string;
    avatar: string;
  };

  constructor(data: Mensaje) {
    this.id = data._id;
    this.time = data.time;
    this.text = data.text;
    this.author = {
      email: data.author.email,
      avatar: data.author.avatar,
    };
  }
}
