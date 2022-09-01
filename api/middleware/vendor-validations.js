const vendorSchema = require("../validation-schema/vendor-validation-schema");

module.exports.vendorValidations = (req, res, next) => {
  const { name, phoneNo } = req.body;
  const isValidSchema = vendorSchema.validate({ name, phoneNo });

  if (isValidSchema.error) {
    return res.status(400).send({
      err: "Invalid name or phone number",
    });
  }

  next();
};
