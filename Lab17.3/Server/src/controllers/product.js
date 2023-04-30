const Product = require("../models/Product");

// GET - /api/products
exports.getAll = async (req, res) => {
  try {
    const products = await Product.find();
    res.json({ items: products });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// POST - /api/products
exports.create = async (req, res) => {
  try {
    const { title, imageUrl, description, price } = req.body;
    await Product.create({ title, imageUrl, description, price, userId: req.session.userId });
    res.json({ message: "Create product successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET - /api/products/:productId
exports.getById = async (req, res) => {
  try {
    const productId = req.params.productId;
    const product = await Product.findById(productId);
    if (!product) res.status(400).json({ message: "Product does not exist" });
    else res.json({ item: product });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// PUT - /api/products/:productId
exports.updateById = async (req, res) => {
  try {
    const productId = req.params.productId;
    const update = req.body;
    await Product.findByIdAndUpdate(productId, update);
    res.json({ message: "Update product successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE - /api/products/:productId
exports.deleteById = async (req, res) => {
  try {
    const productId = req.params.productId;
    await Product.findByIdAndDelete(productId);
    res.json({ message: "Delete product successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
