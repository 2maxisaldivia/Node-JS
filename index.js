const express = require('express')
const { products } = require('./data')
const PORT = process.env.PORT || 8080

const app = express()

app.get('/', (req, res) => {
    res.send("esta es la pagina de inicio ")
})

app.get('/products', (req, res) => {
    res.json(products)
})

app.get('/productWithId', (req, res) => {
    console.log("query", req.query)
    const { id } = req.query
    const idNumber = +(id) // pasar a number un string
    const producto = products.filter(product => product.id === idNumber)
    res.json(producto)
})

app.get('/products/:id', (req, res) => {
    console.log("params",req.params)
    const { id } = req.params
    const idNumber = +(id) // pasar a number un string
    const producto = products.filter(product => product.id === idNumber)
    res.json(producto)
})

app.get('/productoRandom', (req, res) => {
    let enteroAleatorio = products[ Math.floor(Math.random() * products.length)]
    console.log(enteroAleatorio)
    const producto = products.filter(product => product.id === enteroAleatorio.id)
    res.json(producto)
})

const connectedServer = app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})

connectedServer.on('error', error => {
    console.log(error.message)
})