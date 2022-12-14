const joi = require("joi");

const pwdRegex =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

const schema = joi.object({
  email: joi.string().min(3).required().email(),
  username: joi.string().min(3).required(),
  password: joi.string().regex(pwdRegex).required(),
  confirmPassword: joi.string().regex(pwdRegex).required(),
});

module.exports = schema;
