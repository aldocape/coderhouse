import { Mensaje } from '../interfaces';
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

  async createTableMessages() {
    await this.knex.schema.dropTableIfExists(this.table);

    await this.knex.schema.createTable(this.table, (table: any) => {
      table.increments('id').primary();
      table.string('time', 50).notNullable();
      table.string('user', 100).notNullable();
      table.string('text', 400).notNullable();
    });
  }

  async createMessagesHardcoded() {
    const messages = [
      {
        time: '31/01/2021 12:26:47',
        user: 'pedro@gmail.com',
        text: 'Hola!',
      },
      {
        time: '31/01/2021 12:28:00',
        user: 'lucia@hotmail.com',
        text: 'Qué tal?',
      },
      {
        time: '31/01/2021 12:28:40',
        user: 'diego@outlook.com',
        text: 'Cómo están todos?',
      },
    ];
    return await this.knex(this.table).insert(messages);
  }

  async listMessages() {
    return await this.knex(this.table).select('*');
  }

  async createMessage(message: Mensaje) {
    return this.knex(this.table).insert(message);
  }

  async close() {
    await this.knex.destroy();
  }
}

export default SQLClient;
