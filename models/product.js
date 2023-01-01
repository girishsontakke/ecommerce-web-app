const { getDb } = require("../util/database");
const { ObjectId } = require("mongodb");

class Product {
  constructor(title, price, imageUrl, description) {
    this.title = title;
    this.price = price;
    this.imageUrl = imageUrl;
    this.description = description;
    this.db = getDb();
  }
  save() {
    const db = getDb();
    return db.collection("products").insertOne(this);
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
}

module.exports = Product;
