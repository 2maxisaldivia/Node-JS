const express = require("express");
const cartMethods = require("../../model/cartMethods");
const router = express.Router();
const carrito = require("../../cart.json")

router.get("/", (req, res) => {
  const data = cartMethods.getCart();
  res.json(data);
});

router.post("/", (req, res) => {
    const newCart = { "id": carrito.length + 1 , "productos" : []};
    cartMethods.createCart(newCart)
    res.json({ message: `Carrito creado correctamente con id: ${newCart.id}` });
});

router.delete("/:id", (req, res) => {
    const { id } = req.params
    cartMethods.deleteCart(id)
    return res.status(200).send(`Carrito con id ${id} eliminado exitosamente`)
})

router.get('/:id/products', (req, res) => {
    const { id } = req.params
    const cart = cartMethods.findCart(+id)
    if (!cart) {
        res.json({message: `El carrito con id: ${id} no ha sido encontrado`})
    }
    res.json(cart.productos)
})

router.post('/:id/products', (req, res) => {
    const { id } = req.params
    const {title, price, thumbnail} = req.body
    const cart = cartMethods.findCart(+id)
    if (!cart) {
        res.json({message: `El carrito con id: ${id} no ha sido encontrado`})
    }
    const newProduct = {
        title,
        price,
        thumbnail 
    }
    const productToAdd = cartMethods.addProduct(newProduct)

    if (productToAdd === null) {
        res.json({message: `El producto solicitado no ha sido encontrado`})
    } else {
        cart.productos.push(productToAdd)
        cartMethods.saveIntoCart([cart])
        res.json(cart)
    }
})

router.delete('/:id/products/:productId', (req, res) => {
    const { id, productId } = req.params
    const cart = cartMethods.findCart(+id)
    if (!cart) {
        res.json({message: `El carrito con id: ${id} no ha sido encontrado`})
    }
    const products = cart.productos.filter(product => product.id !== +(productId))
    if (!products) {
        // no funciona
        res.json({message: `El producto solicitado no ha sido encontrado`})
    } else {
        console.log(products)
        cart.productos[products]
        cartMethods.saveIntoCart([cart])
        res.json({message: "se borro"})
    }
})

module.exports = router;
