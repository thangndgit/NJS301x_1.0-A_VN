exports.requireLogin = (req, res, next) => {
  if (req.session.isLoggedIn) return next();
  else return res.json({ error: "You must login to use this feature" });
};
