const Order = require("../models/Order");
const User = require("../models/User");

// GET - /api/orders
exports.get = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.session.userId }).populate("items.product");
    res.json({ items: orders });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// POST - /api/orders
exports.create = async (req, res) => {
  try {
    const user = await User.findById(req.session.userId);
    const cartProducts = user.cart.items;

    await Order.create({
      userId: user._id,
      items: cartProducts,
    });

    await user.clearCart();

    res.json({ message: "Create order successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
