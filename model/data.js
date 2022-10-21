const knex = require("knex")

class Products {
  constructor(config, tableName) {
    this.table = tableName
    this.knex = knex(config);

    this.knex.schema.hasTable(this.table)
      .then((response) => {
        if (!response) {
          return this.knex.schema.createTable(this.table, (table) => {
            table.increments("id").notNullable().primary();
            table.string("title").notNullable();
            table.integer("price").notNullable();
            table.string("thumbnail").notNullable();
            console.log("se creo")
          });
        }
      })
      .catch((err) => console.log(err))
    }

  async getProducts() {
    try {
      const products = await this.knex.from(this.table).select('id', 'title', 'price')
      console.table(products)
      return products
    } catch (err) {
      console.log(err)
    }
  }

  async saveProduct(product) {
    const { title, price, thumbnail } = product;
    if (!title || !price || !thumbnail) {
      return null;
    }
    const newProduct = { title, price, thumbnail };
    try {
      await this.knex(this.table).insert(newProduct)
      console.log("se agrego")
    } catch (err) {
      console.log(err)
    }
  }
}
module.exports = Products;
