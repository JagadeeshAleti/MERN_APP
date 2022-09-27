const _ = require("lodash");
const logger = require("../utils/logger");
const loginSchema = require("../validation-schema/login-validation-schema");

module.exports.loginValidations = async (req, res, next) => {
  logger.info("validating login details!");
  const { email, password } = req.body;
  const isValidSchema = loginSchema.validate({
    email,
    password,
  });

  if (isValidSchema.error) {
    const err = _.get(isValidSchema, "error.details")
      .map((d) => d.message)
      .join(",");
    logger.error(`/login: login-validation ${err}`);
    return res.status(401).send({
      err: err,
    });
  }

  logger.info("login details are verified successfully.");
  next();
};
