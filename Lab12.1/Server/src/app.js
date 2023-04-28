const express = require("express");
const cors = require("cors");

const productRte = require("./routes/product");
const cartRte = require("./routes/cart");
const orderRte = require("./routes/order");

const db = require("./utils/database");
const Cart = require("./models/cart");
const CartItem = require("./models/cart-item");
const Order = require("./models/order");
const OrderItem = require("./models/order-item");
const Product = require("./models/product");
const User = require("./models/user");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(async (req, res, next) => {
  try {
    const user = await User.findByPk(1);
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
  }
});

app.use("/api/products", productRte);
app.use("/api/carts", cartRte);
app.use("/api/orders", orderRte);

// User - Cart: One to one
User.hasOne(Cart);
Cart.belongsTo(User);
// User - Order: One to many
User.hasMany(Order);
Order.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
// User - Product: One to many
User.hasMany(Product);
Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
// Product - Cart: Many to many
Product.belongsToMany(Cart, { through: CartItem });
Cart.belongsToMany(Product, { through: CartItem });
// Product - Order: Many to many
Product.belongsToMany(Order, { through: OrderItem });
Order.belongsToMany(Product, { through: OrderItem });

db
  // .sync({ force: true })
  .sync()
  .then((result) => User.findByPk(1))
  .then((user) => {
    if (!user)
      user = User.create({ name: "Admin", email: "motphutvaotran@gmail.com" }).then((user) => user.createCart());
    return user;
  })
  .then((user) => app.listen(5000))
  .catch((error) => console.log(error));
