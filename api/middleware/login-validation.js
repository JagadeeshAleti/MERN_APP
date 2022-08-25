const User = require("../models/User");
const joi = require("joi");

const schema = joi.object({
  email: joi.string().min(3).required().email(),
});

module.exports.loginValidations = async (req, res, next) => {
  const isValidSchema = schema.validate({
    email: req.body.email,
  });

  console.log(isValidSchema);
  if (isValidSchema.error) {
    return res.send({
      msg: "Invalid email",
      // isValidSchema.error?.details?.map((d) => d.message)?.join(","),
    });
  }

  next();
};
