const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  secure: true,
  auth: {
    user: "nsj301.onlineshop@gmail.com",
    pass: "sbfcgnbvdwfxzzrt",
  },
});

const sendMail = async (msg) => {
  const message = { ...msg, from: "nsj301.onlineshop@gmail.com" };
  await transporter.sendMail(message);
};

module.exports = sendMail;
