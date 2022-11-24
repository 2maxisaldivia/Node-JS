const fs = require("fs");
const cart = require("../../cart.json");
const path = require("path");
const products = require("../../products.json")
const pathFile = path.join("cart.json");
const base = path.basename(pathFile);

const saveIntoCart = (product) => {
  fs.writeFileSync(base, JSON.stringify(product, null, 2), {
    encoding: "utf-8",
  });
};

const getCart = () => {
  return cart;
};

const createCart = (newCart) => {
  cart.push(newCart);
  saveIntoCart(cart);
};

const deleteCart = (id) => {
  const findCart = cart.filter((i) => i.id === id);
  if (findCart) {
    saveIntoCart([]);
  }
};

const findCart = (id) => {
  const cartFound = cart.find(i => i.id === id)
  if (!cartFound) {
    return 
  }
  return cartFound
  
}

const addProduct = (newProduct) => {
  const productToAdd = products.find(product => product.title === newProduct.title)
  if (!productToAdd) {
    return null
  }
  return productToAdd
}

// const deleteProduct = (productId) => {
//   const productToDelete = cart.productos.filter(product => product.id !== productId)
//   if (!productToDelete) {
//     return null
//   }
//   return productToDelete
// }

module.exports = {
  saveIntoCart,
  getCart,
  createCart,
  deleteCart,
  findCart,
  addProduct,
  //deleteProduct
  
};