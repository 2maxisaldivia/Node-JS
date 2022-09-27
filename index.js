const express = require('express')
//importa server como HttpServer
const { Server: HttpServer, Server } = require('http')
const { Server: SocketServer } = require('socket.io')

const PORT = process.env.PORT || 8080
const app = express()

app.use(express.static("./public"))

const httpServer = new HttpServer(app)

httpServer.listen(PORT, () => {
    console.log(`server is up and running on port ${PORT}`)
})

const io = new SocketServer(httpServer)

io.on("connection", (socket) => {
    console.log("usuario conectado")
    socket.emit("server-message", "este es un mensaje desde el servidor")
})
