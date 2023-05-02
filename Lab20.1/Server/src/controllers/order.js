const PDFDocument = require("pdfkit");
const path = require("path");
const fs = require("fs");

const Order = require("../models/Order");
const User = require("../models/User");

// GET - /api/orders
exports.get = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.session.userId }).populate("items.product");
    res.json({ items: orders });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// POST - /api/orders
exports.create = async (req, res) => {
  try {
    const user = await User.findById(req.session.userId);
    const cartProducts = user.cart.items;

    const order = await Order.create({
      userId: user._id,
      items: cartProducts,
    });

    await user.clearCart();

    const fullOrder = await order.populate("items.product");

    const invoiceName = "invoice-" + order._id + ".pdf";
    const invoicePath = path.join("data", "invoices", invoiceName);

    const doc = new PDFDocument();
    doc.pipe(fs.createWriteStream(invoicePath));
    doc.fontSize(26).text("Invoice", { underline: true });
    doc.text("-----------------------");
    doc.fontSize(14);

    const totalPrice = fullOrder.items.reduce((total, item) => {
      doc.text(item.product.title + " - " + item.quantity + " x $" + item.product.price);
      return total + item.quantity * item.product.price;
    }, 0);

    doc.fontSize(26).text("---");
    doc.fontSize(20).text("Total Price: $" + totalPrice);
    doc.end();

    res.json({ message: "Create order successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
