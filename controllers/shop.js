const Product = require("../models/product");
const Cart = require("../models/cart");
const CartItem = require("../models/cart-item");
const { where } = require("sequelize");

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

exports.getCart = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ where: { userId: req.user.id } });
    const cartItems = await CartItem.findAll({ where: { cartId: cart.id } });
    const cartProducts = await Promise.all(
      cartItems.map((cartItem) => {
        return new Promise((resolve, reject) => {
          Product.findByPk(cartItem.productId)
            .then((product) => {
              resolve({
                ...product.dataValues,
                quantity: cartItem.quantity
              });
            })
            .catch((error) => reject(error));
        });
      })
    );

    res.render("shop/cart", {
      path: "/cart",
      pageTitle: "Your Cart",
      products: cartProducts
    });
  } catch (error) {
    res.redirect("/");
  }
};

exports.postCart = async (req, res, next) => {
  const prodId = req.body.productId;
  try {
    const product = await Product.findByPk(prodId);
    const cart = await Cart.findOne({ where: { userId: req.user.id } });
    const [cartItem, _created] = await CartItem.findOrCreate({
      where: { cartId: cart.id, productId: product.id }
    });

    await CartItem.update(
      { quantity: cartItem.quantity + 1 },
      {
        where: {
          cartId: cart.id,
          productId: product.id
        }
      }
    );
  } catch (error) {
  } finally {
    res.redirect("/cart");
  }
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;

  Product.findById(prodId, (product) => {
    Cart.deleteProduct(prodId, product.price);
    res.redirect("/cart");
  });
};

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
