const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const errorController = require("./controllers/error");
const sequelize = require("./util/database");
const User = require("./models/user");
const Product = require("./models/product");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(async (req, _res, next) => {
  try {
    const user = await User.findByPk(1);
    req.user = user;
  } catch (error) {}
  next();
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Product);

sequelize
  .sync()
  .then(() => User.findByPk(1))
  .then((user) => {
    if (!user) {
      return User.create({
        name: "girish",
        email: "girishsontakke7@gmail.com"
      });
    }
    return Promise.resolve(user);
  })
  .then(() => {
    app.listen(3000);
  })
  .catch(console.error);
