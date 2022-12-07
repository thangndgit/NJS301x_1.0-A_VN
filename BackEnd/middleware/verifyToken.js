// Import model
const User = require("../models/user");

const verifyToken = (req, res, next) => {
  // Get token
  const token = req.query.token || "";

  // Get all users
  const users = User.all();

  // Find user
  const userExist = users.find((user) => user.token === token);

  // If user does not exist
  if (!userExist) return res.status(401).json({ message: "Unauthorized" });

  // If user exist
  next();
};

module.exports = verifyToken;
