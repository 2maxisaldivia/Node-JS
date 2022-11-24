const mongoose = require("mongoose");
const dbConfig = require("../../data/db.config");
class MongoContainer {
  constructor(collection, schema) {
    
    this.model = mongoose.model(collection, schema);
  }

  static async connect() {
    await mongoose.connect(dbConfig.mongodb.uri);
  }

  static async disconnect() {
    await mongoose.disconnect();
  }

  async getAll(filter = {}) {
    const documents = await this.model.find(filter, { __v: 0 }).lean();
    return documents;
  }

  async getById(id) {
    const document = await this.model.findOne({ _id: id }, { __v: 0 });
    if (!document) {
      return `Producto con el id: ${id} no fue encontrado`;
    }
    return document;
  }

  async save(item) {
    const newDocument = new this.model(item);
    return await newDocument.save();
  }

  async update(id, item) {
    const updatedDocument = await this.model.updateOne(
      { _id: id },
      { $set: { ...item } }
    );
    if (!updatedDocument.matchedCount) {
      return `Producto con el id: ${id} no fue encontrado`;
    }
    return updatedDocument;
  }

  async delete(id) {
    return await this.model.deleteOne({ _id: id });
  }
}

module.exports = MongoContainer