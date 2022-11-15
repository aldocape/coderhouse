import { Producto } from '../interfaces';
import knex from 'knex';

class SQLClient {
  knex: any;
  table: string;

  // Recibo en el constructor el objeto de configuración de knex y
  // el nombre de la tabla sobre la cual trabajará
  constructor(config: any, table: string) {
    this.knex = knex(config);
    this.table = table;
  }

  async listProducts(id = {}) {
    return await this.knex(this.table).select('*').where(id);
  }

  async createProduct(product: Producto) {
    return await this.knex(this.table).insert(product);
  }

  async updateProduct(product: Producto) {
    return await this.knex(this.table).where('id', product.id).update(product);
  }

  async deleteProduct(id: string) {
    return await this.knex(this.table).where('id', id).del();
  }

  async createTable() {
    await this.knex.schema.dropTableIfExists(this.table);

    await this.knex.schema.createTable(this.table, (table: any) => {
      table.increments('id').primary();
      table.string('timestamp', 50).notNullable();
      table.string('nombre', 200).notNullable();
      table.string('descripcion', 400);
      table.string('codigo', 100).notNullable();
      table.string('foto', 400).notNullable();
      table.float('precio').notNullable();
      table.integer('stock').notNullable();
    });
  }

  async createProductsHardcoded() {
    const products = [
      {
        timestamp: '09/11/2022 07:30:42',
        nombre:
          'Colchón 2 1/2 plazas de espuma Piero box blanco y gris - 140cm x 190cm x 25cm',
        descripcion:
          'Construido con espuma de poliuretano, el colchón tiene una larga y duradera vida. Este tipo de material hace que la posición que adopte el cuerpo sea ergonómica y permite que se reparta el peso sobre la superficie de manera balanceada.',
        codigo: 'Piero2331',
        foto: 'https://http2.mlstatic.com/D_NQ_NP_622492-MLA48099676614_112021-O.webp',
        precio: 61619,
        stock: 3,
      },
      {
        timestamp: '09/11/2022 07:33:49',
        nombre: 'Microondas Tedge 20 Litros Digital Blanco 220v 5 Potencia',
        descripcion:
          'Somos TEDGE. Nos propusimos crear productos de tecnología con alta calidad, ofreciendo a nuestros compradores una gran variedad y los mejores precios del mercado.',
        codigo: 'Tedge4890',
        foto: 'https://http2.mlstatic.com/D_NQ_NP_984100-MLA48430605662_122021-O.webp',
        precio: 20999,
        stock: 6,
      },
      {
        timestamp: '09/11/2022 07:35:19',
        nombre: 'Google Chromecast 3ª Generación Full Hd Carbón',
        descripcion:
          'Gracias a su compatibilidad con streaming en Full HD vas a aprovechar de todo el contenido disponible que más te guste en alta definición, con imágenes de colores más vibrantes y llamativos en comparación a su predecesor HD.',
        codigo: 'SKU GA00439-LA',
        foto: 'https://http2.mlstatic.com/D_NQ_NP_620605-MLA32691559317_102019-O.webp',
        precio: 12499,
        stock: 10,
      },
    ];
    return await this.knex(this.table).insert(products);
  }

  async close() {
    await this.knex.destroy();
  }
}

export default SQLClient;
