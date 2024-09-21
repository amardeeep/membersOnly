/*
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const queries = require("../db/queries");
const emptyErr = "Can not be empty.";
const alphaErr = "Should only have alphabets.";
const emailErr = "Must Be A valid E-Mail";
const passwordErr =
  "is weak. Should atleast be 8 characters long and must have 1 number, 1 symbol, 1 Uppercase letter and 1 Lowercase letter";
const confirmPassowrdErr = "does not match password.";
const validateUser = [
  body("username")
    .trim()
    .not()
    .isEmpty()
    .withMessage(`Username ${emptyErr}`)
    .isEmail()
    .withMessage(`Username ${emailErr}`),
  body("fistname")
    .trim()
    .not()
    .isEmpty()
    .withMessage(`First Name ${emailErr}`)
    .isAlpha()
    .withMessage(`First Name ${alphaErr}`),
  body(`lastname`)
    .trim()
    .not()
    .isEmpty()
    .withMessage(`Last Name ${emptyErr}`)
    .isAlpha()
    .withMessage(`Last Name ${alphaErr}`),
  body("password")
    .isStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minNumbers: 1,
      minSymbols: 1,
      minUppercase: 1,
    })
    .withMessage(`Password ${passwordErr}`),
  body("cpassword")
    .custom((value, { req }) => {
      return value === req.body.password;
    })
    .withMessage(`Confirm Password ${confirmPassowrdErr}`),
];
const createUser = [
  validateUser,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .render("signup", { title: "Sign Up", errors: errors.array() });
    }
    const { username, firstname, lastname, password } = req.body;
    bcrypt.hash(password, 10, async (err, hashedPassword) => {
      await queries.insertUser(username, hashedPassword, firstname, lastname);
    });

    res.redirect("/");
  },
]; */
const queries = require("../db/queries");
const createUser = async (req, res) => {
  console.log(req.body);
  const { username, firstname, lastname, password } = req.body;
  await queries.insertUser(username, password, firstname, lastname);
  res.redirect("/");
};
module.exports = { createUser };
