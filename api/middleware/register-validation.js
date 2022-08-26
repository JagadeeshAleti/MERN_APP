const User = require("../models/User");
const joi = require("joi");
const pwdRegex =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

const schema = joi.object({
  email: joi.string().min(3).required().email(),
  username: joi.string().min(3).alphanum(),
  password: joi.string().regex(pwdRegex),
  confirmPassword: joi.string().regex(pwdRegex),
});

module.exports.registerValidations = async (req, res, next) => {
  const { email, username, password, confirmPassword } = req.body;

  const isValidUser = schema.validate({
    email,
    username,
    password,
    confirmPassword,
  });

  if (isValidUser.error) {
    return res.status(401).send({
      err: "Invalid email or password",
    });
  }

  if (!(password === confirmPassword)) {
    return res
      .status(401)
      .send({ err: "Password and confirm password are not same" });
  }

  const exsitedEmail = await User.find({ email });
  if (exsitedEmail.length >= 1) {
    return res.status(409).send({ err: "Email already taken!!!" });
  }

  const exsitedUsername = await User.find({ username });
  if (exsitedUsername.length >= 1) {
    return res.status(409).send({ err: "Username already taken!!" });
  }

  const existedUser = await User.find({ email, username });
  if (existedUser.length >= 1) {
    return res.status(409).json({ err: "User alreay existed" });
  }

  next();
};
