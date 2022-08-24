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

  if (!!isValidUser.error) {
    return res.send({
      msg: "Invalid email or password",
      // isValidUser.error?.details?.map((d) => d.message)?.join(","),
    });
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
