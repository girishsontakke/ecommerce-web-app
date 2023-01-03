const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const errorController = require("./controllers/error");
const { mongoConnect } = require("./util/database");
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

const PORT = process.env.APPLICATION_PORT || 5000;

mongoConnect(() => {
  app.listen(PORT);
  console.log(`successfully connected at http://localhost:${PORT}`);
});
