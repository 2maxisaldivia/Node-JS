const express = require("express");
const { engine } = require("express-handlebars");
const path = require("path");
const Products = require("./model/data");
const Messages = require("./model/messages")
const dbConfig = require("./db/config")
const { formatMessage } = require("./utils/utils");
const admin = require("firebase-admin")

const { Server: HttpServer } = require("http");
const { Server: SocketServer } = require("socket.io");

const app = express();
const PORT = process.env.PORT || 8080;
const httpServer = new HttpServer(app);
const io = new SocketServer(httpServer);

const products = new Products(dbConfig.mariaDB, "products");
const mensajes = new Messages(dbConfig.sqlite, "messages")

var serviceAccount = require("./db/firebase/firebase.config.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
//mensajes.createTable()
//Midllewaress
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));


app.engine(
  "hbs",
  engine({
    extname: "hbs", 
    defaultLayout: "main.hbs",
    layoutsDir: path.resolve(__dirname, "./views/layouts"), 
    partialsDir: path.resolve(__dirname, "./views/partials"), 
  })
);

app.set("views", __dirname + "/views"); 
app.set("view engine", "hbs"); 


// app.get("/api/productos", async (req, res) => {
//   const productos = await products.getProducts()
//   res.json(productos);
// });

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/", (req, res) => {
  const data = req.body;
  const { title, price, thumbnail } = req.body;
  if (!title || !price || !thumbnail) {
    return;
  }
  products.saveProduct(data);
  res.redirect("/");
});

app.get("*", (req, res) => {
  res.status(404).send(`<h1>404 NOT FOUND</h1>`);
});

const messages = [];
const users = [];

//Método io() con sus parámetros
io.on("connection", async (socket) => {
  console.log(`Nuevo usuario conectado!`);

  const prod = await products.getProducts()
  io.emit("items", prod);
  const msg = await mensajes.getMessages()
  io.emit("message", msg);

  socket.on("new-user", (email) => {
    const newUser = {
      id: socket.id,
      email: email,
    };
    users.push(newUser);
  });

  socket.on("new-message", async (msg) => {
    const user = users.find((user) => user.id === socket.id);
    const newMessage = formatMessage(socket.id, user.email, msg);
    mensajes.addMessage(newMessage)
    // messages.push(newMessage);
    //products.saveMessage(user.email, msg, newMessage.time);
    io.emit("chat-message", newMessage);
  });

  const id = socket.id;
  socket.on("disconnect", () => {
    io.emit("disc", `${id}`);
    console.log(`disconect ${id}`);
  });
});

//Conexión del Servidor
const connectedServer = httpServer.listen(PORT, () => {
  console.log(`server is up and running on port: ${PORT}`);
});

connectedServer.on("error", (error) => {
  console.log(`error:`, error.message);
});