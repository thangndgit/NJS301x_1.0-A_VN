const fs = require("fs");
const path = require("path");

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

  static findById(prodId, cb = (prod) => {}) {
    loadProducts((prods) => {
      const product = prods.find((prod) => prod.id === prodId);
      cb(product);
    });
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

  static fetchAll(cb = (prods) => {}) {
    loadProducts(cb);
  }
}

module.exports = Product;
