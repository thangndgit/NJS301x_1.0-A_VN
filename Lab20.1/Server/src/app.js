const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const MongoStore = require("connect-mongo");
const path = require("path");

const authRte = require("./routes/auth");
const productRte = require("./routes/product");
const cartRte = require("./routes/cart");
const orderRte = require("./routes/order");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ credentials: true, origin: true }));

app.use(
  session({
    secret: "matitmui",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: "mongodb+srv://matitmui:12345679@funix-njs101x-cluster.mvj9tlu.mongodb.net/njs301-lab?retryWrites=true",
    }),
    cookie: { maxAge: 24 * 60 * 60 * 1000 },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/api/auth", authRte);
app.use("/api/products", productRte);
app.use("/api/carts", cartRte);
app.use("/api/orders", orderRte);

app.get("/invoices/:invoiceName", (req, res) => {
  const invoiceName = req.params.invoiceName;
  const rootDir = path.resolve(process.cwd());
  res.sendFile(path.join(rootDir, "data", "invoices", invoiceName));
});

mongoose
  .connect("mongodb+srv://matitmui:12345679@funix-njs101x-cluster.mvj9tlu.mongodb.net/njs301-lab?retryWrites=true")
  .then((result) => app.listen(5000))
  .catch((err) => console.log(err));
