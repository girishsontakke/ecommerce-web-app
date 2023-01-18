const { ObjectId } = require("mongodb");
const { getDb } = require("../util/database");
const Product = require("./product");

class User {
  constructor(name, email, cart, id) {
    this.name = name;
    this.email = email;
    this.cart = cart;
    this._id = id;
  }

  async save() {
    const db = getDb();
    try {
      await db.collection("users").insertOne(this);
    } catch (error) {
      console.error(error);
    }
  }
  static async findAll() {
    const db = getDb();
    try {
      const users = await db.collection("users").find().toArray();
      return users;
    } catch (error) {
      console.error(error);
    }
    return [];
  }

  async addToCart(product) {
    const cartProductindex = this.cart?.items.findIndex(
      (item) => item.productId.toString() === product._id.toString()
    );

    let newQuantity = 1;
    let updatedCartItems = [];
    if (this.cart?.items) updatedCartItems = [...this.cart.items];
    if (cartProductindex >= 0) {
      newQuantity = this.cart.items[cartProductindex].quantity + 1;
      updatedCartItems[cartProductindex].quantity = newQuantity;
    } else {
      updatedCartItems.push({
        productId: new ObjectId(product._id),
        quantity: 1
      });
    }

    const updatedCart = {
      items: updatedCartItems
    };
    const db = getDb();
    return db
      .collection("users")
      .updateOne(
        { _id: new ObjectId(this._id) },
        { $set: { cart: updatedCart } }
      )
      .catch(console.error);
  }

  getCart() {
    return Promise.all(
      this.cart.items.map(async (item) => {
        const product = await Product.findByPk(item.productId);
        return {
          ...item,
          ...product
        };
      })
    );
  }

  static async findByPk(userId) {
    const db = getDb();
    try {
      const user = await db
        .collection("users")
        .find({ _id: new ObjectId(userId) })
        .next();
      return user;
    } catch (error) {
      console.error(error);
    }
    return {};
  }
}

module.exports = User;
