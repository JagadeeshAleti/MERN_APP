const router = require("express").Router();
const { VendorController } = require("../controllers/vendorController");
const logger = require("../utils/logger");

router.put("/update-vendor/:id", async (req, res) => {
  const { email, name, phoneNo } = req.body;
  const userID = req.params.id;
  try {
    logger.info("Updating vendor.....");
    const updatedVendor = await VendorController.updateVendor({
      email,
      name,
      phoneNo,
      userID,
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
