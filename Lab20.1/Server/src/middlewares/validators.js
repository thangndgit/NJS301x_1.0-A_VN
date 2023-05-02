const { body, validationResult } = require("express-validator");
const User = require("../models/User");

// Validator of sign up form
exports.signUp = [
  // Validate name
  body("name").notEmpty().withMessage("Missing information for field name"),

  // Validate email
  body("email")
    .notEmpty()
    .withMessage("Missing information for field email")
    .isEmail()
    .withMessage("Invalid email format")
    .custom(async (value) => {
      const user = await User.findOne({ email: value });
      if (user) throw new Error("Email has already been used");
      return true;
    }),

  // Validate password
  body("password")
    .notEmpty()
    .withMessage("Missing information for field password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),

  // Validate confirm password
  body("confirmPassword")
    .notEmpty()
    .withMessage("Missing information for field confirm password")
    .custom((value, { req }) => {
      if (value !== req.body.password) throw new Error("Password do not match");
      return true;
    }),

  // Handle errors, if any
  (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) return next();
    return res.status(400).json({
      error: errors.errors[0].msg,
      errorField: errors.errors[0].path,
    });
  },
];

// Validator of sign in form
exports.signIn = [
  // Validate email
  body("email")
    .notEmpty()
    .withMessage("Missing information for field email")
    .isEmail()
    .withMessage("Invalid email format")
    .custom(async (value) => {
      const user = await User.findOne({ email: value });
      if (!user) throw new Error("Account does not exist");
      return true;
    }),

  // Validate password
  body("password").notEmpty().withMessage("Missing information for field password"),

  // Handle errors, if any
  (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) return next();
    return res.status(400).json({
      error: errors.errors[0].msg,
      errorField: errors.errors[0].path,
    });
  },
];

// Validator of create product form
exports.editProduct = [
  // Validate title
  body("title")
    .notEmpty()
    .withMessage("Missing information for field title")
    .isAlphanumeric()
    .withMessage("Title should only include letters and numbers")
    .isLength({ min: 3 })
    .withMessage("Title must be at least 3 characters long"),

  // Validate image url
  body("imageUrl")
    .notEmpty()
    .withMessage("Missing information for field image url")
    .isURL()
    .withMessage("Invalid image URL"),

  // Validate price
  body("price")
    .notEmpty()
    .withMessage("Missing information for field price")
    .isFloat()
    .withMessage("Price must be a float"),

  // Validate description
  body("description")
    .notEmpty()
    .withMessage("Missing information for field description")
    .isLength({ min: 5 })
    .withMessage("Description must have a minimum length of 5 characters"),

  // Handle errors, if any
  (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) return next();
    return res.status(400).json({
      error: errors.errors[0].msg,
      errorField: errors.errors[0].path,
    });
  },
];
