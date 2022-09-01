const router = require("express").Router();
const logger = require("../utils/logger");
const { VendorController } = require("../controllers/vendorController");
const { vendorValidations } = require("../middleware/vendor-validations");

router.put("/:id", vendorValidations, async (req, res) => {
  const { name, phoneNo } = req.body;
  const vendorID = req.params.id;
  try {
    logger.info("Updating vendor.....");
    const updatedVendor = await VendorController.updateVendor(vendorID, {
      name,
      phoneNo,
    });
    logger.info(`Updates vendor is : ${updatedVendor}`);
    res.status(200).json(updatedVendor);
  } catch (err) {
    logger.error(err.message);
    const [code, message] = ErrorHandler.handle(err);
    res.status(code).json({ message });
  }
});

module.exports = router;
