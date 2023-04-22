const Cart = require("../models/cart");
const Product = require("../models/product");

// GET - /api/carts
exports.get = (req, res) => {
  try {
    // Cart.fetch((cart) => {
    //   Product.fetchAll((prods) => {
    //     const products = prods
    //       .map((prod) => {
    //         const prodExist = cart.products.find((prd) => prd.id === prod.id);
    //         if (prodExist) return { ...prod, qty: prodExist.qty };
    //         return prod;
    //       })
    //       .filter((prod) => prod.qty);
    //     res.json({ item: { products, totalPrice: cart.totalPrice } });
    //   });
    // });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// PUT - /api/products
exports.update = (req, res) => {
  try {
    const action = req.body.action;
    const productId = req.body.productId;
    const productPrice = req.body.productPrice;

    switch (action) {
      case "ADD_TO_CART":
        Cart.addProduct(productId, productPrice);
        res.json({ message: "Add product to cart successfully" });
        break;
      case "REMOVE_FROM_CART":
        Cart.removeProduct(productId, productPrice);
        res.json({ message: "Remove product from cart successfully" });
        break;
      default:
        break;
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
