const express = require("express")
const productsRoutes = require("./products/products.routes") 

const router = express.Router()

// Middlewares

router.use("/products", productsRoutes)

module.exports = router