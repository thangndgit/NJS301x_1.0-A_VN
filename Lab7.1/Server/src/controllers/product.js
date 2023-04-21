const Product = require("../models/product");

// GET - /api/products
exports.getAll = (req, res) => Product.fetchAll((data) => res.json({ items: data }));

// POST - /api/products
exports.create = (req, res) => {
  console.log(req.body);
  const product = new Product(req.body.title, req.body.imageUrl, req.body.description, req.body.price);
  product.save();
  res.json({ message: "Create user successfully" });
};
