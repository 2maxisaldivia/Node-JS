const knex = require("knex");

class Messages {
  constructor(config, tableName) {
    this.table = tableName;
    this.knex = knex(config);

    this.knex.schema
      .hasTable(this.table)
      .then((exists) => {
        if (!exists) {
          return this.knex.schema.createTable(this.table, (table) => {
            table.increments("id").notNullable().primary();
            table.string("email").notNullable();
            table.string("message").notNullable();
            table.string("date").notNullable();
            console.log("mensdajes creados")
          });
        }
      })
      .catch((err) => console.log("error en constructor", err));
  }

  async createTable() {
    try {
      const exist = await this.knex.schema.hasTable("messages");
      if (!exist) {
        return await this.knex.schema.createTable(this.table, (table) => {
          table.increments("id").notNullable().primary();
          table.string("email").notNullable();
          table.string("message").notNullable();
          table.string("date").notNullable();
          console.log("se creo bien la mensaje")
        });
      }
    } catch (err) {
      console.log(err);
    }
  }

  async getMessages() {
    try {
      const messages = await this.knex
        .from(this.table)
        .select("*");
        console.log(messages);
      return messages;
    } catch (error) {
      console.log("error al obtener mensajes", error);
    }
  }

  async addMessage(data) {
    try {
      await this.knex(this.table).insert(data)
    } catch (error) {
      console.log("error al añadir mensaje", error);
    }
  }
  
}
module.exports = Messages;
