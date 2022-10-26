const router = require("express").Router();
const logger = require("../utils/logger");
const _ = require("lodash");

const { VendorController } = require("../controllers/vendor.controller");
const { vendorValidations } = require("../middleware/vendor-validations");
const { ErrorHandler } = require("../utils/error");
const { UserType } = require("../constants/user-types");

const verifyToken = require("../middleware/authJWT");

// Authorization
router.put(
  "/:id",
  [vendorValidations, verifyToken(UserType.VENDOR)],
  async (req, res) => {
    const vendorID = _.get(req, "user.vendor[0]._id");
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

//Get all vendors
router.get("/", verifyToken(UserType.CUSTOMER), async (req, res) => {
  try {
    logger.info("fetching all vendors....");
    const vendors = await VendorController.getAllVednors();
    res.status(201).json(vendors);
  } catch (err) {
    logger.error("Error is :", err.message);
    const r = ErrorHandler.handle(err);
    res.status(r.status).json(r);
  }
});
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
