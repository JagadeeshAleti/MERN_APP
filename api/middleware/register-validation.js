const User = require("../models/User");

const emailValidator = require("email-validator");
const passwordValidator = require("password-validator");

module.exports.registerValidations = async (req, res, next) => {
  const { email, username, password, confirmPassword } = req.body;

  const isvalidEmail = emailValidator.validate(email);
  if (!isvalidEmail) {
    return res.send({ msg: "Not a valid Email" });
  }

  const passwordSchema = new passwordValidator();
  passwordSchema
    .is()
    .min(8)
    .is()
    .max(100)
    .has()
    .uppercase()
    .has()
    .lowercase()
    .has()
    .digits(2)
    .has()
    .not()
    .spaces()
    .is()
    .not()
    .oneOf(["Passw0rd", "Password123"]);

  const isValidPwd =
    passwordSchema.validate(password) &&
    passwordSchema.validate(confirmPassword);

  if (!isValidPwd) {
    return res.send({ msg: "Not a valid password" });
  }

  if (!(password === confirmPassword)) {
    return res.send({ err: "Password and confirm password are not same" });
  }

  const exsitedEmail = await User.find({ email });
  if (exsitedEmail.length >= 1) {
    return res.send({ msg: "Email already taken!!!" });
  }

  const exsitedUsername = await User.find({ username });
  if (exsitedUsername.length >= 1) {
    return res.send({ msg: "Username already taken!!" });
  }

  const existedUser = await User.find({ email, username });
  if (existedUser.length >= 1) {
    return res.status(409).json("User alreay existed");
  }

  next();
};
