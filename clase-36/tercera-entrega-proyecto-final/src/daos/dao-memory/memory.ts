import logger from '../../middlewares/logger';
import { v4 as uuidv4 } from 'uuid';
import ProductsDTO from '../../dto/products.dto';
import MessagesDTO from '../../dto/messages.dto';

const products: any = [
  {
    id: 'cc31e62d-d874-4278-94c1-aefc46989a0a',
    nombre: 'Protector Solar para niños',
    descripcion: 'Protector factor 50',
    foto: 'https://http2.mlstatic.com/D_NQ_NP_708632-MLA52162580244_102022-O.webp',
    codigo: '',
    precio: 1574,
    stock: 50,
  },
];
const messages: any = [
  {
    author: {
      email: 'aldocape@gmail.com',
      nombre: 'Aldo',
      apellido: 'Capezzali',
      edad: 40,
      alias: '',
      avatar: '',
    },
    text: 'holaaa',
    time: '12/02/2023 07:57:09',
    id: '3e1e894e-a707-47ba-bbe3-0252371bc80a',
  },
  {
    author: {
      email: 'aldocape@gmail.com',
      nombre: '',
      apellido: '',
      edad: '',
      alias: '',
      avatar:
        'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1101.jpg',
    },
    text: 'hola ahi va otro mensaje',
    time: '12/02/2023 09:08:32',
    id: '7967fc31-63cb-495d-b446-a48f9c85c424',
  },
];
const carts: any = [];

export default class DaoMemory {
  private collection: string;
  private static instance: DaoMemory;
  private recurso: any;

  private constructor(collection: string) {
    this.collection = collection;

    switch (collection) {
      case 'product':
        this.recurso = products;
        break;
      case 'cart':
        this.recurso = carts;
        break;
      case 'message':
        this.recurso = messages;
        break;

      default:
        break;
    }
  }

  public static getInstance(collection: string): DaoMemory {
    DaoMemory.instance = new DaoMemory(collection);

    logger.info(`Instancia de clase: ${collection} iniciada`);
    return DaoMemory.instance;
  }

  async getAll() {
    try {
      const items = this.recurso;
      if (items.length)
        switch (this.collection) {
          case 'product':
            return items.map(
              (producto: any) => new ProductsDTO(producto, false)
            );
          case 'message':
            return items.map((message: any) => new MessagesDTO(message, false));
          default:
            break;
        }

      return items;
    } catch (err: any) {
      logger.error(`ERROR => ${err}`);
    }
  }

  async save(document: any) {
    const items = this.recurso;
    items.push(document);
    return document;
  }
}
