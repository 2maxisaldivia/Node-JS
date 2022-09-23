const products = [
  {
    id: 1,
    title: "remera",
    price: 12,
    thumbnail: "https://remera.jpg",
  },
  {
    id: 2,
    title: "Pantalon",
    price: 22,
    thumbnail: "https://pantalon.jpg",
  },
  {
    id: 3,
    title: "Short",
    price: 33,
    thumbnail: "https://short.jpg",
  },
];

class Products {
  constructor() {
    this.items = products;
  }

  async save(product) {
    const { title, price, thumbnail } = product;
    if (!title || !price || !thumbnail) {
      return null;
    }
    const newProduct = {
      id: this.items.length + 1,
      title,
      price,
      thumbnail,
    };
    this.items.push(newProduct);
    return this.items;
  }

  async getAll() {
    return this.items;
  }

  async getById(number) {
    return this.items.find((product) => product.id === number);
  }

  async getFindIndex(id) {
    return this.items.findIndex((product) => product.id === Number(id));
  }

  async deleteProduct(id) {
    return this.items.filter((product) => product != id);
  }

  async deleteProductAll() {
    return [];
  }
}

module.exports = Products;