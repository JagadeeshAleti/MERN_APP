const router = require("express").Router();
const logger = require("../utils/logger");

const { VendorController } = require("../controllers/vendorController");
const { vendorValidations } = require("../middleware/vendor-validations");
const { ErrorHandler } = require("../utils/error");
const { UserType } = require("../constants/user-types");

const verifyToken = require("../middleware/authJWT");

// Authorization
router.put(
  "/:id",
  [vendorValidations, verifyToken(UserType.VENDOR)],
  async (req, res) => {
    const vendorID = req.user.vendor._id;

    const { name, phoneNo } = req.body;
    try {
      logger.info("updating vendor details.....");
      const updatedVendor = await VendorController.updateVendor(vendorID, {
        name,
        phoneNo,
      });
      logger.info("vendor updated successfully.");
      res.status(200).json(updatedVendor);
    } catch (err) {
      logger.error(err.message);
      const r = ErrorHandler.handle(err);
      res.status(r.status).json(r);
    }
  }
);

//Get vendor detaisl
router.get("/:id", verifyToken(UserType.VENDOR), async (req, res) => {
  const id = req.user._id;
  try {
    logger.info("fetching vendor details....");
    const vendorInfo = await VendorController.getVednorDetails(id);
    logger.info("Vendor details fetched sucessfully.....");
    res.status(201).json(vendorInfo);
  } catch (err) {
    logger.error("Error is :", err.message);
    const r = ErrorHandler.handle(err);
    res.status(r.status).json(r);
  }
});
module.exports = router;
