const User = require("../models/User");
const bcrypt = require("bcrypt");

// POST - /api/sign-up
exports.signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await User.findOne({ email });
    if (user) return res.status(400).json({ error: "Email existed" });

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      name,
      email,
      password: hashedPassword,
      cart: { items: [] },
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
    if (!user) return res.status(400).json({ error: "Account does not exist" });

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
