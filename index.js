const express = require("express");
const { engine } = require("express-handlebars");
const path = require("path");
const Products = require("./model/data");

const app = express();
const products = new Products();
const { items } = products;

const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.engine("hbs", engine({
    extname: "hbs",
    defaultLayout: "main.hbs",
    layoutsDir: path.resolve(__dirname, "./views/layouts"),
    partialsDir: path.resolve(__dirname, "./views/partials")
}))

app.set("views", "./views")
app.set("view engine", "hbs")

app.post("/productos", (req, res) => {
  const data = req.body;
  const { title, price, thumbnail } = req.body;
  if (title || price || thumbnail) {
    products.save(data);
    res.redirect("/productos");
  }
});

app.get("/productos", (req, res) => {
  if (items.length >= 1) {
    res.render("index", {
      mostrarProductos: true,
      products: items,
    });
  } else {
    res.render("index", {
      mostrarProductos: false,
    });
  }
});

const connectedServer = app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})

connectedServer.on('error', error => {
    console.log(error.message)
})