const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  cart: {
    items: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
  },
});

userSchema.methods.addToCart = function (productId) {
  const cartItems = [...this.cart.items];
  const itemIndex = cartItems.findIndex((item) => item.product.toString() === productId.toString());

  if (itemIndex >= 0) cartItems[itemIndex].quantity++;
  else cartItems.push({ product: productId, quantity: 1 });

  this.cart.items = cartItems;
  return this.save();
};

userSchema.methods.removeFromCart = function (productId) {
  const cartItems = this.cart.items.filter((item) => item.product.toString() !== productId.toString());
  this.cart.items = cartItems;
  return this.save();
};

userSchema.methods.clearCart = function () {
  this.cart.items = [];
  return this.save();
};

module.exports = mongoose.model("User", userSchema);
