const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const productRte = require("./routes/product");
const cartRte = require("./routes/cart");
const orderRte = require("./routes/order");

const User = require("./models/User");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(async (req, res, next) => {
  try {
    const user = await User.findById("644c03968b91265efa2f4237");
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
  }
});

app.use("/api/products", productRte);
app.use("/api/carts", cartRte);
app.use("/api/orders", orderRte);

mongoose
  .connect("mongodb+srv://matitmui:12345679@funix-njs101x-cluster.mvj9tlu.mongodb.net/njs301-lab?retryWrites=true")
  .then(async (result) => {
    const user = await User.findOne();
    if (!user)
      await User.create({
        name: "Matitmui",
        email: "matitmui@gmail.com",
        cart: { items: [] },
      });
    app.listen(5000);
  })
  .catch((err) => console.log(err));
