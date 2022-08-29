const joi = require("joi");

const schema = joi.object({
  email: joi.string().min(3).required().email(),
});

module.exports = schema;
