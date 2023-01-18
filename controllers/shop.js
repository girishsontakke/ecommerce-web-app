const Product = require("../models/product");

exports.getProducts = async (req, res, next) => {
  try {
    const products = await Product.findAll();
    return res.render("shop/product-list", {
      prods: products,
      pageTitle: "All Products",
      path: "/products"
    });
  } catch (error) {
    console.error(error);
  }
};

exports.getProduct = async (req, res, next) => {
  const prodId = req.params.productId;
  let product = {};
  try {
    product = await Product.findByPk(prodId);
  } catch (error) {
    console.error(error);
  }

  return res.render("shop/product-detail", {
    product: product,
    pageTitle: product?.title,
    path: "/products"
  });
};

exports.getIndex = async (req, res, next) => {
  let products = [];
  try {
    products = await Product.findAll();
  } catch (error) {
    console.error(error);
  }
  return res.render("shop/index", {
    prods: products,
    pageTitle: "Shop",
    path: "/"
  });
};

exports.getCart = async (req, res) => {
  try {
    const user = req.user;
    const cartProducts = await user.getCart();
    return res.render("shop/cart", {
      path: "/cart",
      pageTitle: "Your Cart",
      products: cartProducts
    });
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
};

exports.postCart = async (req, res, next) => {
  const prodId = req.body.productId;
  try {
    const product = await Product.findByPk(prodId);
    const user = req.user;
    await user?.addToCart(product);
  } catch (error) {
    console.error(error);
  } finally {
    res.redirect("/cart");
  }
};

// exports.postCartDeleteProduct = async (req, res, next) => {
//   const prodId = req.body.productId;

//   try {
//     const cartItem = await CartItem.findOne({ where: { productId: prodId } });
//     cartItem.destroy();
//   } catch (error) {
//   } finally {
//     res.redirect("/cart");
//   }
// };

exports.getOrders = (req, res, next) => {
  res.render("shop/orders", {
    path: "/orders",
    pageTitle: "Your Orders"
  });
};

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    path: "/checkout",
    pageTitle: "Checkout"
  });
};
