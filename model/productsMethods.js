const fs = require('fs')
const products = require("../products.json")
const path = require("path")

const pathFile = path.join("products.json")
const base = path.basename(pathFile)

const saveIntoDatabase = (DB) => {
  fs.writeFileSync(base, JSON.stringify(DB, null, 2), {
    encoding: "utf-8",
  });
};

const getAllProducts = () => {
  return products;
};

const getProductById = (id) => {
  const product = products.filter(item => item.id === id)
  if (!product) {
     return `Producto con el id: ${id} no fue encontrado`;
  }
  return product
}

const createProduct = (newProduct) => {
  products.push(newProduct)
  saveIntoDatabase(products)
}

const deleteProduct = (id) => {
  const list = products.filter(product => product.id !== +id)
  saveIntoDatabase(list)
  return list
}

const findIndex = (id) => {
  const index = products.findIndex((product) => product.id === +(id))
  return index;
}

const updateProduct = () => {
  saveIntoDatabase(products)
}


module.exports = {
  saveIntoDatabase,
  getAllProducts,
  getProductById,
  createProduct,
  deleteProduct,
  findIndex,
  updateProduct
};