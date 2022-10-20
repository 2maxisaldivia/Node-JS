const knex = require("knex")
const products = [];
const msg = [];
class Products {
  constructor(config, tableName) {
    this.table = tableName
    this.knex = knex(config);
    this.items = products;
    this.data = msg;

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

  async addProduct(item) {
    return this.knex.insert(item);
  }

  async getProducts(tableName) {
    try {
      const products = await this.knex.from(this.table).select('id', 'title', 'price')
      console.table(products)
      return products
    } catch (err) {
      console.log(err)
    }
    return this.knex.from(tableName).select('id', 'title', 'price');

  }

  async saveProduct(product) {
    const { title, price, thumbnail } = product;
    if (!title || !price || !thumbnail) {
      return null;
    }
    const newProduct = { id: this.items.length + 1, title, price, thumbnail };
    try {
      await this.knex(this.table).insert(newProduct)
      console.log("se agrego")
    } catch (err) {
      console.log(err)
    }
    //this.items.push(newProduct);
    //return this.items;
  }

  async saveMessage(email, text, time) {
    const user = { email, text, time };
    this.data.push(user);
    return this.data;
  }
}
module.exports = Products;
