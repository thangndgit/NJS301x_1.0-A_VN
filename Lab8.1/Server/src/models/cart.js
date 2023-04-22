const fs = require("fs");
const path = require("path");

const cartPath = path.join(path.dirname(require.main.filename), "data", "cart.json");

const loadCart = (cb) => {
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
      console.log(id);
      const prodIdx = cart.products.findIndex((prod) => prod.id === id);
      if (prodIdx === -1) cart.products.push({ id, qty: 1 });
      else cart.products[prodIdx].qty++;
      cart.totalPrice += Number(productPrice);
      saveCart(cart);
    });
  }

  static fetch(cb) {
    loadCart(cb);
  }
}

module.exports = Cart;
