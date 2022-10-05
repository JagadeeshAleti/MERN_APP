const adminSchema = require("../validation-schema/admin-validation-schema");

module.exports.adminValidations = (req, res, next) => {
  const { name, phoneNo } = req.body;
  const isValidSchema = adminSchema.validate({ name, phoneNo });

  if (isValidSchema.error) {
    return res.status(400).send({
      err: "Invalid name or phone number",
    });
  }

  next();
};
