const User = require("../models/User");

// GET - /api/carts
exports.get = async (req, res) => {
  try {
    const user = await User.findById(req.session.userId).populate("cart.items.product");
    const cart = user.cart;

    res.json({ item: cart });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// PUT - /api/carts
exports.update = async (req, res) => {
  try {
    const action = req.body.action;
    const productId = req.body.productId;
    const user = await User.findById(req.session.userId).populate("cart.items.product");

    switch (action) {
      case "ADD_TO_CART":
        await user.addToCart(productId);
        res.json({ message: "Add product to cart successfully" });
        break;
      case "REMOVE_FROM_CART":
        await user.removeFromCart(productId);
        res.json({ message: "Remove product from cart successfully" });
        break;
      default:
        break;
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log(error);
  }
};
