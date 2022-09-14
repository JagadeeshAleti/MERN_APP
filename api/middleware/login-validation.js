const logger = require("../utils/logger");
const loginSchema = require("../validation-schema/login-validation-schema");

module.exports.loginValidations = async (req, res, next) => {
  logger.info("validating login details!");
  const { email, password } = req.body;
  const isValidSchema = loginSchema.validate({
    email,
    password,
  });

  console.log(isValidSchema);
  if (isValidSchema.error) {
    return res.status(400).send({
      err: "Invalid email",
    });
  }
  logger.info("login details are verified successfully.");
  next();
};
