"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MessagesDTO {
    constructor(data, esMongo) {
        if (esMongo)
            this.id = data._id;
        else
            this.id = data.id;
        this.time = data.time;
        this.text = data.text;
        this.author = {
            email: data.author.email,
            avatar: data.author.avatar,
        };
    }
}
exports.default = MessagesDTO;
