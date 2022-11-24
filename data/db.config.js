const firebaseConfig = require("./firebase/firebase.config.json");
const envConfig = require("../config")

module.exports = {
  mongodb: {
    uri: `mongodb+srv://coder:${envConfig.DB_PASSWORD}@coderhouse.p5elyma.mongodb.net/?retryWrites=true&w=majority`,
  },

  firebase: {
    credentials: firebaseConfig,
  },
};