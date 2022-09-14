const express = require('express')
const apiRoutes = require("./routers/app.routers")
const path = require("path")
const PORT = process.env.PORT || 8080


const app = express()

// Parsea el body de una peticion 
app.use(express.json())
app.use(express.static('public'))
//app.use(express.urlencoded({extended: true}))

// app.get('/', (req, res) => {
//     res.sendFile(path.resolve(__dirname, "./nav-app/index.html"))
// })

app.use("/api", apiRoutes)


const connectedServer = app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})

connectedServer.on('error', error => {
    console.log(error.message)
})

