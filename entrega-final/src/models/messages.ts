import { model, Schema } from 'mongoose';

export const messagesCollection = 'message';

interface IMessage extends Document {
  time: string;
  message: string;
  user: {
    username: string;
    nombre: string;
    direccion: string;
    telefono: string;
  };
}

const MessageSchema: Schema = new Schema(
  {
    time: { type: String, require: true, max: 100 },
    message: { type: String, require: true, max: 600 },
    user: {
      username: { type: String, require: true, max: 50 }, // Email del autor del mensaje, es único y lo identifica, no se repite
      nombre: { type: String, require: true, max: 80 },
      direccion: { type: String, require: true, max: 100 },
      telefono: { type: String, max: 50 },
    },
  },
  { timestamps: false, versionKey: false }
);

export default model<IMessage>(messagesCollection, MessageSchema);
