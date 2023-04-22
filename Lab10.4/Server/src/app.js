const express = require("express");
const cors = require("cors");

const productRte = require("./routes/product");
const cartRte = require("./routes/cart");

const db = require("./utils/database");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/products", productRte);
app.use("/api/cart", cartRte);

db.sync().then((result) => {
  // console.log(result);
  app.listen(5000);
});
