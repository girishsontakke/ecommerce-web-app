const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("node_ecommerce", "root", "password", {
  dialect: "mysql",
  host: "localhost"
});

module.exports = sequelize;
