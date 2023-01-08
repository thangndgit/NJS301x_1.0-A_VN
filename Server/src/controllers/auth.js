// Import base
const bcrypt = require("bcrypt");

// Import model
const User = require("../models/user");

// POST - /api/auth/register
exports.postRegister = (req, res, next) => {
  // Get register data from request
  const reqData = req.body;

  // Create response data
  const resData = {};

  // Get all users
  User.find()
    .then((users) => {
      // Find user if username or email existed
      const userExisted = users.find(
        (user) =>
          user.username === reqData.username || user.email === reqData.email
      );

      // If user existed, return error
      if (userExisted) {
        resData.type = "Error";
        resData.message = "Username or email have already existed";
        return res.status(409).json(resData);
      }

      // If user does not exist
      const hashedPassword = bcrypt.hashSync(reqData.password1, 10);

      // Create user
      User.create({
        username: reqData.username,
        password: hashedPassword,
        fullName: reqData.name,
        phoneNumber: reqData.phone,
        email: reqData.email,
        isAdmin: false,
      });

      resData.type = "Success";
      resData.message = "Create account successfully";
      return res.json(resData);
    })
    // Catch error
    .catch((err) => {
      resData.type = "Error";
      resData.message = "Some error occur in server: " + err;
      res.status(400).json(resData);
    });
};

// GET - /api/auth/login
exports.getLogin = (req, res, next) => {
  // Get login data from session
  const isLoggedIn = req.session.isLoggedIn;
  const user = req.session.user;

  // Create response data
  const resData = {};

  resData.type = "Success";
  resData.isLoggedIn = Boolean(isLoggedIn);
  resData.user = user;
  res.json(resData);
};

// POST - /api/auth/login
exports.postLogin = (req, res, next) => {
  // Get login data from request
  const reqData = req.body;

  // Create response data
  const resData = {};

  // If this request is for logging out
  if (reqData.isLoggedOut) {
    // Destroy session
    req.session.destroy();

    resData.type = "Success";
    resData.message = "Logout successfully";
    return res.json(resData);
  }

  // Find user with given username or email
  User.findOne({
    $or: [{ username: reqData.username }, { username: reqData.email }],
  })
    .then((user) => {
      // If account does not exist
      if (!user || user.isAdmin !== reqData.isAdmin) {
        resData.type = "Error";
        resData.message = "Wrong email or username";
        resData.user = user;
        return res.status(401).json(resData);
      }

      // If account exist
      const isPasswordMatch = bcrypt.compareSync(
        reqData.password,
        user.password
      );

      // If password does not match
      if (!isPasswordMatch) {
        resData.type = "Error";
        resData.message = "Wrong password";
        return res.status(401).json(resData);
      }

      // If password match
      req.session.isLoggedIn = true;
      req.session.user = user;

      resData.type = "Success";
      resData.message = "Login successfully";
      return res.json(resData);
    })
    // Catch error
    .catch((err) => {
      resData.type = "Error";
      resData.message = "Some error occur in server: " + err;
      res.status(400).json(resData);
    });
};
