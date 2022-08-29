const User = require("../models/User");
const logger = require("../utils/logger");
const registerSchema = require("../validation-schema/register-validation-schema");

module.exports.registerValidations = async (req, res, next) => {
  const { email, username, password, confirmPassword } = req.body;

  const isValidSchema = registerSchema.validate({
    email,
    username,
    password,
    confirmPassword,
  });

  if (isValidSchema.error) {
    const err = isValidSchema.error.details?.map((d) => d.message).join(",");
    logger.error(err);
    return res.status(401).send({
      err: err,
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
