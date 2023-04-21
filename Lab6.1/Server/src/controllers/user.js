const users = [];

// GET - /api/users
exports.getAll = (req, res) => res.json({ items: users });

// POST - /api/users
exports.create = (req, res) => {
  const user = req.body.user;
  users.push(user);
  res.json({ message: "Create user successfully" });
};
