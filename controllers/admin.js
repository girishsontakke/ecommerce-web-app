const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false
  });
};

exports.postAddProduct = async (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;

  const product = new Product(title, price, imageUrl, description);
  try {
    await product.save();
  } catch (error) {
    console.error(error);
  }
  return res.redirect("/");
};

exports.getEditProduct = async (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }
  const prodId = req.params.productId;
  try {
    const products = await req.user.getProducts({ where: { id: prodId } });
    const product = products[0];
    if (!product) {
      return res.redirect("/admin/products");
    }
    return res.render("admin/edit-product", {
      pageTitle: "Edit Product",
      path: "/admin/edit-product",
      editing: editMode,
      product: product
    });
  } catch (error) {
    console.error(error);
    return res.redirect("/");
  }
};

exports.postEditProduct = async (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;

  await Product.upsert({
    id: prodId,
    title: updatedTitle,
    price: updatedPrice,
    imageUrl: updatedImageUrl,
    description: updatedDesc
  });
  res.redirect("/admin/products");
};

exports.getProducts = async (req, res, next) => {
  let products = [];
  try {
    products = await Product.findAll();
  } catch (error) {
    console.error(error);
  }
  return res.render("admin/products", {
    prods: products,
    pageTitle: "Admin Products",
    path: "/admin/products"
  });
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findByPk(prodId)
    .then((product) => {
      product.destroy();
    })
    .catch(console.error)
    .finally(() => {
      res.redirect("/admin/products");
    });
};
