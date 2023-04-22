const Product = require("../models/product");

// GET - /api/products
exports.getAll = (req, res) => {
  try {
    Product.fetchAll().then(([rows]) => {
      res.json({ items: rows });
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// POST - /api/products
exports.create = (req, res) => {
  try {
    const { title, imageUrl, description, price } = req.body.product;
    const product = new Product(title, imageUrl, description, price);
    product.save();
    res.json({ message: "Create user successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET - /api/products/:productId
exports.getById = (req, res) => {
  try {
    const productId = req.params.productId;
    Product.findById(productId).then(([rows]) => {
      if (!rows.length) res.status(400).json({ message: "Product does not exist" });
      res.json({ item: rows[0] });
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// PUT - /api/products/:productId
exports.updateById = (req, res) => {
  try {
    const product = req.body.product;
    Product.updateById(product.id, product);
    res.json({ message: "Update product successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
