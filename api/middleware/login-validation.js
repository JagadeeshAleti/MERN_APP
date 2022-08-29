const loginSchema = require("../validation-schema/login-validation-schema");

module.exports.loginValidations = async (req, res, next) => {
  const isValidSchema = loginSchema.validate({
    email: req.body.email,
  });

  console.log(isValidSchema);
  if (isValidSchema.error) {
    return res.status(400).send({
      err: "Invalid email",
    });
  }

  next();
};
