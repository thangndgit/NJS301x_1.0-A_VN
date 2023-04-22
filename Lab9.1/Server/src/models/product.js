const fs = require("fs");
const path = require("path");
const db = require("../utils/database");

const productPath = path.join(path.dirname(require.main.filename), "data", "products.json");

const loadProducts = (cb) => {
  fs.readFile(productPath, (err, fileContent) => {
    if (err) cb([]);
    else cb(JSON.parse(fileContent));
  });
};

const saveProducts = (prods) => fs.writeFile(productPath, JSON.stringify(prods), (err) => console.log(err));

class Product {
  constructor(title, imageUrl, description, price) {
    this.id = Math.random().toString();
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    loadProducts((prods) => {
      prods.push(this);
      saveProducts(prods);
    });
  }

  static findById(prodId) {
    return db.execute("SELECT * FROM products WHERE products.id = ?", [prodId]);
  }

  static updateById(prodId, newProduct, cb = (error) => {}) {
    loadProducts((prods) => {
      const prodIdx = prods.findIndex((prod) => prod.id === prodId);
      if (prodIdx === -1) cb(new Error("Product does not exist"));
      else {
        const oldProduct = prods[prodIdx];
        prods[prodIdx] = { ...oldProduct, ...newProduct };
        saveProducts(prods);
      }
    });
  }

  static fetchAll() {
    return db.execute("SELECT * FROM products");
  }
}

module.exports = Product;
