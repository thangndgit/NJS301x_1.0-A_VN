const { body, validationResult } = require("express-validator");
const User = require("../models/User");

// Validator of sign up form
exports.signUp = [
  // Validate that there is no empty field
  body("name").notEmpty().withMessage("Missing information for field name"),
  body("email").notEmpty().withMessage("Missing information for field email"),
  body("password").notEmpty().withMessage("Missing information for field password"),
  body("confirmPassword").notEmpty().withMessage("Missing information for field confirm password"),
  // Validate that the email is in the correct format
  body("email").isEmail().withMessage("Invalid email format"),
  // Validate that the password is at least 8 characters long
  body("password").isLength({ min: 8 }).withMessage("Password must be at least 8 characters long"),
  // Validate that the email is not already in use
  body("email").custom(async (value) => {
    const user = await User.findOne({ email: value });
    if (user) throw new Error("Email has already been used");
    return true;
  }),
  // Validate that the password and confirmPassword fields match
  body("confirmPassword").custom((value, { req }) => {
    if (value !== req.body.password) throw new Error("Passwords do not match");
    return true;
  }),
  // Handle errors, if any
  (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) return next();
    return res.status(400).json({ error: errors.errors[0].msg });
  },
];

// Validator of sign in form
exports.signIn = [
  // Validate that there is no empty field
  body("email").notEmpty().withMessage("Missing information for field email"),
  body("password").notEmpty().withMessage("Missing information for field password"),
  // Validate that the email is in the correct format
  body("email").isEmail().withMessage("Invalid email format"),
  // Validate that the email exists in the system
  body("email").custom(async (value) => {
    const user = await User.findOne({ email: value });
    if (!user) throw new Error("Account does not exist");
    return true;
  }),
  // Handle errors, if any
  (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) return next();
    return res.status(400).json({ error: errors.errors[0].msg });
  },
];
