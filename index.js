const express = require('express');
const authorizer = require('./middlewares/authorizer');
const apiRoutes = require("./routers/app.routers")
const PORT = process.env.PORT || 8080
const admin = require("firebase-admin")
const { getFirestore } = require('firebase-admin/firestore')

var serviceAccount = require("./data/firebase/firebase.config.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

console.log("firebase")

const makeRequest = async () => {
  try {
    const db = getFirestore()
    const query = db.collection("")
  } catch {

  }
}

const app = express()

// Parsea el body de una peticion 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(authorizer)

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