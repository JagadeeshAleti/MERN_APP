const customerSchema = require("../validation-schema/customer-validation-schema");

module.exports.customerValidations = (req, res, next) => {
  const { name, phoneNo } = req.body;
  const isValidSchema = customerSchema.validate({ name, phoneNo });

  if (isValidSchema.error) {
    return res.status(400).send({
      err: "Invalid name or phone number",
    });
  }

  next();
};
