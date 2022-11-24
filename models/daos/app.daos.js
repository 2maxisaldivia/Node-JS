const envConfig = require('../../config')

let ProductsDao;
let UsersDao;

switch (envConfig.DATASOURCE) {
    case 'mongo':
        ProductsDao = require('./products/products.mongo.daos')
        break;
    case 'firebase':
        ProductsDao = require('./products/products.firebase.daos')
        break
    default: 
        throw new Error ('Invalid datasource')
}
module.exports = {
    ProductsDao,
    UsersDao
}