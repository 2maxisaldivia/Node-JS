const express = require("express")
const router = express.Router()
const Products = require("../../data")

let products = new Products()

// Rutas 
router.get('/', async (req, res) => {
    const data = await products.getAll().then((res) => res)
    res.json(data)
})

router.get('/:id', async (req, res) => {
    //console.log("params",req.params)
    const { id } = req.params// pasar a number un string
    const product = await products.getById(id)
    if (!product) {
        return res.status(400).send({error : "producto no encontrado"})
    }
    res.json(product)
})

router.post('/', (req, res) => {
    //console.log(req.body)
    const { title, price, thumbnail } = req.body
    const newProduct = {
        id: products.products.length + 1,
        title,
        price,
        thumbnail
    }
    products.products.push(newProduct)
    res.json(newProduct)
})

router.delete("/:id", (req, res, next) => {
    const { id } = req.params
    const indProduct = products.findIndex(product => product.id === +(id))
    if (indProduct < 0) {
        return res.status(400).send(`Producto con id ${id} no existe`)
    }
    const deletedProducts = products.splice(indProduct, 1)
    //fs.writeFileSync("../../data.json", JSON.stringify(products))
    res.json(deletedProducts)
})

router.put("/:id", async (req, res) => {
  //Desestructuramos el id que recibimos por el objeto req.params.
  //Desestructuramos el body que seria el objeto.
  const {
    params: { id },
    body: { title, price, thumbnail },
  } = req;
  if (!title || title === Number(title) || !price) {
    return res.status(404).json({
      status: false,
      error: `product does not comply with the required format`,
    });
  }
  //Buscamos el indice con el metodo findIndex, este nos retorna el numero del indice del id buscado o -1 si no coincide
  const indexProduct = await products.findIndex(id);
  //Evaluamos en caso que no coincida y retornamos un status: 404
  if (indexProduct < 0) {
    return res.status(404).json({
      status: false,
      error: `Product with id: ${id} not found`,
    });
  }
  //Seleccionamos el nuevo producto por indice y lo editamos con los nuevos valores enviados por PUT
  const newProduct = {
    id: indexProduct + 1,
    title,
    price,
    thumbnail,
  };
  //Reemplazamos los valores por el nuevo producto.
  products.products[indexProduct] = newProduct;
  return res.json({ success: true, result: newProduct });
});

module.exports = router