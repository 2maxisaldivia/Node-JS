const admin = require("firebase-admin");
const getFirestore = require("firebase-admin/firestore");
const dbConfig = require("../../data/db.config");

class FirebaseContainer {
  constructor(collection) {
    const db = getFirestore();
    this.query = db.collection(collection);
  }
  static async connect() {
    admin.initializeApp({
      credential: admin.credential.cert(dbConfig.firebase.credential),
    });
      
  }
  async getAll() {
      const docRefs = await this.query.get()
      const documents = docRefs.docRefs
      return documents.map(document => {
          return {
              id: document.id,
              ...document.data()
          }
      })
  }

  async getById(id) {
      const docRef = await this.query.get(id)
      if (!docRef) {
          return `Producto con el id: ${id} no fue encontrado`;
      }
      const document = await docRef.get()
      return document.data()
  }

  async save(item) {
      const docRef = this.query.doc()
      return await docRef.set(item)
  }

  async update(id, item) {
      const docRef = this.query.doc(id)
      if (!docRef) {
          return `Producto con el id: ${id} no fue encontrado`;
      }
      return await docRef.update(item)
  }

  async delete(id) {
      const docRef = this.query.doc(id)
      return await docRef.delete()
  }
}
module.exports = FirebaseContainer