const path = require('path')
const path1 = path.resolve("db/sqlite", "chat.sqlite");
module.exports = {
    mariaDB: {
        client: 'mysql',
        connection: {
            host:'127.0.0.1',
            user: 'root',
            database: 'ecommerce'
        }
    },
    sqlite: {
        client: 'sqlite3',
        connection: {
            filename: path1
        }
    },
    useNullAsDefault: true
}
