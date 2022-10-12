const products = [
  {
    id: 1,
    title: "remera",
    price: 12,
    thumbnail:
      "https://remera.jpg",
  },
  {
    id: 2,
    title: "Pantalon",
    price: 22,
    thumbnail:
      "https://pantalon.jpg",
  },
  {
    id: 3,
    title: "Short",
    price: 33,
    thumbnail:
      "https://short.jpg",
  },
];

class Products {
  constructor() {
    this.products = products;
  }

  async getAll() {
    return this.products;
  }

  async getById(id) {
    return this.products.find((product) => product.id === +(id));
  }

  async findIndex(id) {
    return this.products.findIndex((product) => product.id === +(id));
  }

  async deleteProduct(id) {
    return this.products.filter((product) => product.id !== +(id));
  }
}

module.exports = Products;