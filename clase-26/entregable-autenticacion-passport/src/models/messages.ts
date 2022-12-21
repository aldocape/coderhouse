import { model, Schema } from 'mongoose';

export const messagesCollection = 'messages';

const MessageSchema: Schema = new Schema(
  {
    time: { type: String, require: true, max: 100 },
    text: { type: String, require: true, max: 600 },
    author: {
      email: { type: String, require: true, max: 50 }, // Sería el id del autor del mensaje, es único y lo identifica, no se repite
      nombre: { type: String, require: true, max: 40 },
      apellido: { type: String, require: true, max: 40 },
      edad: { type: Number, require: true },
      alias: { type: String, require: true, max: 40 },
      avatar: { type: String, max: 300 },
    },
  },
  { timestamps: false, versionKey: false }
);

export default model(messagesCollection, MessageSchema);
