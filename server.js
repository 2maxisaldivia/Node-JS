const envConfig = require('./config')
const app = require("./app")
const PORT = process.env.PORT || 8080
const DATASOURCE_BY_ENV = {
    mongo: require('./models/containers/mongo.container'),
    firebase: require('./models/containers/firebase.container')
}

const dataSource = DATASOURCE_BY_ENV[envConfig.DATASOURCE]

app.listen(PORT, () => {
    dataSource.connect().then(() => {
        console.log( "server is up in port " + PORT + "IN "  + envConfig.DATASOURCE)
    })
})