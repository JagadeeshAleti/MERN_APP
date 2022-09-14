const joi = require("joi");

const schema = joi.object({
  email: joi.string().min(3).required().email(),
  password: joi.string().required(),
});

module.exports = schema;
