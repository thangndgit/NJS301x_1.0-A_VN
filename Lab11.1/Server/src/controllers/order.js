const Cart = require("../models/cart");
const Product = require("../models/product");

// GET - /api/orders
exports.get = async (req, res) => {
  try {
    const orders = await req.user.getOrders({ include: ["products"] });
    res.json({ items: orders });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// POST - /api/orders
exports.create = async (req, res) => {
  try {
    const cart = await req.user.getCart();
    const cartProducts = await cart.getProducts();

    const order = await req.user.createOrder();
    const orderProducts = cartProducts.map((product) => {
      product.orderItem = { quantity: product.cartItem.quantity };
      return product;
    });

    await order.addProducts(orderProducts);
    await cart.setProducts(null);

    res.json({ message: "Create order successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
