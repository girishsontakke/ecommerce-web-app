const { getDb } = require("../util/database");
const { ObjectId } = require("mongodb");

class Product {
  constructor(title, price, imageUrl, description, userId, id) {
    this.title = title;
    this.price = price;
    this.imageUrl = imageUrl;
    this.description = description;
    this.userId = userId;
    if (id) this._id = new ObjectId(id);
  }
  save() {
    const db = getDb();
    if (this._id) {
      return db
        .collection("products")
        .updateOne({ _id: this._id }, { $set: this })
        .catch(console.error);
    } else {
      return db.collection("products").insertOne(this);
    }
  }
  static async findAll() {
    const db = getDb();
    const products = await db.collection("products").find().toArray();
    return products;
  }
  static async findByPk(prodId) {
    const db = getDb();
    const product = await db
      .collection("products")
      .find({ _id: new ObjectId(prodId) })
      .next();
    return product;
  }
  static async deleteById(prodId) {
    const db = getDb();
    return await db
      .collection("products")
      .deleteOne({ _id: new ObjectId(prodId) });
  }
}

module.exports = Product;
