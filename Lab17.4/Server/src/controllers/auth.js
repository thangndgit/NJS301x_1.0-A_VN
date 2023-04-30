const User = require("../models/User");
const bcrypt = require("bcrypt");
const sendMail = require("../utils/mail");

// POST - /api/sign-up
exports.signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      name,
      email,
      password: hashedPassword,
      cart: { items: [] },
    });

    await sendMail({
      to: email,
      subject: "Sign up successfully",
      html: "<h1>You have successfully registered an account</h1>",
    });
    res.json({ message: "Create account successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// POST - /api/sign-in
exports.signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) return res.status(401).json({ error: "Wrong password" });

    req.session.isLoggedIn = true;
    req.session.userId = user._id;
    await req.session.save();

    res.json({ message: "Login successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// POST - /api/sign-out
exports.signOut = async (req, res) => {
  await req.session.destroy();
  res.json({ message: "Logout successfully" });
};
