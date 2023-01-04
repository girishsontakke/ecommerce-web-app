const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const errorController = require("./controllers/error");
const { mongoConnect } = require("./util/database");
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const User = require("./models/user");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(async (req, _res, next) => {
  const users = await User.findAll();
  if (users.length > 0) req.user = users[0];
  next();
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

const PORT = process.env.APPLICATION_PORT || 5000;

mongoConnect(async () => {
  const users = await User.findAll();
  if (users.length === 0) {
    const user = new User("girish", "girishsontakke7@gmail.com");
    await user.save();
  }
  app.listen(PORT);
  console.log(`successfully connected at http://localhost:${PORT}`);
});
