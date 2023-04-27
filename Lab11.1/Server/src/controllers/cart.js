const Product = require("../models/product");

// GET - /api/carts
exports.get = async (req, res) => {
  try {
    const cart = await req.user.getCart();
    const products = await cart.getProducts();

    res.json({ item: { products } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// PUT - /api/carts
exports.update = async (req, res) => {
  try {
    const action = req.body.action;
    const productId = req.body.productId;

    const product = await Product.findByPk(productId);
    const cart = await req.user.getCart();
    const [cartProduct] = await cart.getProducts({ where: { id: productId } });

    switch (action) {
      case "ADD_TO_CART":
        const quantity = cartProduct ? cartProduct.cartItem.quantity + 1 : 1;
        cart.addProduct(product, { through: { quantity } });
        res.json({ message: "Add product to cart successfully" });
        break;
      case "REMOVE_FROM_CART":
        cartProduct.cartItem.destroy();
        res.json({ message: "Remove product from cart successfully" });
        break;
      default:
        break;
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
