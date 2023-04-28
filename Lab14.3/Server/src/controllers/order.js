const Order = require("../models/Order");

// GET - /api/orders
exports.get = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user._id }).populate("items.product");
    res.json({ items: orders });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// POST - /api/orders
exports.create = async (req, res) => {
  try {
    const user = req.user;
    const cartProducts = user.cart.items;

    await Order.create({
      userId: user.id,
      items: cartProducts,
    });

    await user.clearCart();

    res.json({ message: "Create order successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
