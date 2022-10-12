const express = require('express')
const apiRoutes = require("./routers/app.routers")
const PORT = process.env.PORT || 8080

const app = express()

// Parsea el body de una peticion 
app.use(express.json())


app.get('/', (req, res) => {
    res.send("esta es la pagina de inicio")
})

app.use("/api", apiRoutes)


const connectedServer = app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})

connectedServer.on('error', error => {
    console.log(error.message)
})