const fs = require("fs");
const path = require("path");

const cartPath = path.join(path.dirname(require.main.filename), "data", "cart.json");

const loadCart = (cb = (cart) => {}) => {
  fs.readFile(cartPath, (err, fileContent) => {
    if (err)
      cb({
        products: [],
        totalPrice: 0,
      });
    else cb(JSON.parse(fileContent));
  });
};

const saveCart = (cart) => fs.writeFile(cartPath, JSON.stringify(cart), (err) => console.log(err));

class Cart {
  static addProduct(id, productPrice) {
    loadCart((cart) => {
      const prodIdx = cart.products.findIndex((prod) => prod.id === id);
      if (prodIdx === -1) cart.products.push({ id, qty: 1 });
      else {
        cart.products[prodIdx].qty++;
        cart.totalPrice += Number(productPrice);
        saveCart(cart);
      }
    });
  }

  static removeProduct(id, productPrice) {
    loadCart((cart) => {
      const prodIdx = cart.products.findIndex((prod) => prod.id === id);
      if (prodIdx !== -1) {
        cart.totalPrice -= cart.products[prodIdx].qty * Number(productPrice);
        cart.products = cart.products.filter((prod, i) => i === prodIdx);
        saveCart(cart);
      }
    });
  }

  static fetch(cb = (cart) => {}) {
    loadCart(cb);
  }
}

module.exports = Cart;
