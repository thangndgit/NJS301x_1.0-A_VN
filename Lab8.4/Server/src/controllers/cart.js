const Cart = require("../models/cart");
const Product = require("../models/product");

// GET - /api/carts
exports.get = (req, res) => {
  try {
    Cart.fetch((cart) => {
      Product.fetchAll((prods) => {
        const products = prods
          .map((prod) => {
            const prodExist = cart.products.find((prd) => prd.id === prod.id);
            if (prodExist) return { ...prod, qty: prodExist.qty };
            return prod;
          })
          .filter((prod) => prod.qty);
        res.json({ item: { products, totalPrice: cart.totalPrice } });
      });
    });
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
