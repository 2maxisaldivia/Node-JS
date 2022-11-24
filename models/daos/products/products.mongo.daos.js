const MongoContainer = require("../../containers/mongo.container");
const { Schema } = require('mongoose')

const collection = "users"
const productsSchema = new Schema({
    id: { type: string },
    title: { type: string },
    price: { type: string },
    thumbnail: { type: string },
})

class ProductsMongoDao extends MongoContainer {
    constructor() {
        super(collection, productsSchema)
    }
}
module.exports = ProductsMongoDao