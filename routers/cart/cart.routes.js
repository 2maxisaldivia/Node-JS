// const express = require("express")
// const Cart = require("../../model/cartMethods")
// const router = express.Router()
// const fs = require("fs")
// const path = require('path')
// let items = new Cart()

// const filePath = path.join('/model', 'cart.json')
// const base = path.basename(filePath)
// console.log(filePath)

// router.post('/', (req, res) => {
//     const idCart = 1
//     const cart = [{
//         idCarti: idCart
//     }]
//     fs.writeFileSync(base, JSON.stringify(cart))
//     res.json({message: `Carrito creado correctamente con id: ${idCart}`})
// })


// router.get('/', (req, res) => {
//     console.log("carrito")
//     res.json(cart)
// })

// module.exports = router