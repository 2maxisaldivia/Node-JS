const express = require('express')

const PORT = process.env.PORT || 8080

const app = express()

app.get('/', (req, res) => {
    res.send("esta es la pagina de inicio ")
})

app.get('/productos', (req, res) => {
    res.send("esta es la pagina de productos ")
})

app.get('/productoRandom', (req, res) => {
    res.send("esta es la pagina de producto random ")
})

const connectedServer = app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})

connectedServer.on('error', error => {
    console.log(error.message)
})