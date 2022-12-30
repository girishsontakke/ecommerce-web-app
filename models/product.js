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
      },
      notEmpty: {
        msg: "title can't be empty"
      }
    }
  },
  price: {
    type: DataTypes.DOUBLE,
    allowNull: false,
    validate: {
      notNull: {
        msg: "price can't be null"
      },
      notEmpty: {
        msg: "price can't be empty"
      }
    }
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: "imageUrl can't be null"
      },
      notEmpty: {
        msg: "imageUrl can't be empty"
      }
    }
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: "description can't be null"
      },
      notEmpty: {
        msg: "description can't be empty"
      }
    }
  }
});

module.exports = Product;
