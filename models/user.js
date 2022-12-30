const { DataTypes } = require("sequelize");
const sequelize = require("../util/database");
const Cart = require("./cart");

const User = sequelize.define("user", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: { isEmail: true }
  }
});

User.afterCreate("create cart", (user) => {
  Cart.create({
    userId: user.id
  });
});

module.exports = User;
