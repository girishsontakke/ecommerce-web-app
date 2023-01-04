const { getDb } = require("../util/database");

class User {
  constructor(name, email) {
    this.name = name;
    this.email = email;
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
