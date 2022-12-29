const { DataTypes } = require("sequelize");
const sequelize = require("../util/database");

const Product = sequelize.define("product", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: "title can't be null"
      }
    }
  },
  price: {
    type: DataTypes.DOUBLE,
    allowNull: false,
    validate: {
      notNull: {
        msg: "price can't be null"
      }
    }
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: "imgUrl can't be null"
      }
    }
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: "description can't be null"
      }
    }
  }
});

module.exports = Product;
