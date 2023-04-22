const Cart = require("../models/cart");

// GET - /api/carts
exports.get = (req, res) => {
  try {
    Cart.fetch((data) => res.json({ item: data }));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// PUT - /api/products
exports.update = (req, res) => {
  try {
    const action = req.body.action;
    if (action === "ADD_TO_CART") {
      const productId = req.body.productId;
      const productPrice = req.body.productPrice;
      Cart.addProduct(productId, productPrice);
      res.json({ message: "Add product to cart successfully" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
