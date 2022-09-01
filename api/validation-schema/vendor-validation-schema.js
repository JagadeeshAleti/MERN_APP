const joi = require("joi");

const schema = joi.object({
  name: joi.string().min(3).required(),
  phoneNo: joi
    .string()
    .length(10)
    .pattern(/^[0-9]+$/)
    .required(),
});

module.exports = schema;
