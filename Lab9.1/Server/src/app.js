const express = require("express");
const cors = require("cors");

const productRte = require("./routes/product");
const cartRte = require("./routes/cart");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/products", productRte);
app.use("/api/cart", cartRte);

app.listen(5000, () => console.log("Server is running at port 5000"));
