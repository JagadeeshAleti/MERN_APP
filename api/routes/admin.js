const router = require("express").Router();
const logger = require("../utils/logger");
const _ = require("lodash");

const { UserType } = require("../constants/user-types");
const { adminValidations } = require("../middleware/admin-validations");
const { AdminController } = require("../controllers/admin.controller");
const { ErrorHandler } = require("../utils/error");

const verifyToken = require("../middleware/authJWT");

// Update admin details
router.put(
  "/:id",
  [adminValidations, verifyToken(UserType.ADMIN)],
  async (req, res) => {
    const adminID = _.get(req, "user.admin[0]._id");
    const { name, phoneNo } = req.body;

    try {
      logger.info("updating vendor details.....");
      const updatedAdmin = await AdminController.updateAdmin(adminID, {
        name,
        phoneNo,
      });
      logger.info("admin updated successfully.");
      res.status(200).json(updatedAdmin);
    } catch (err) {
      logger.error(err.message);
      const r = ErrorHandler.handle(err);
      res.status(r.status).json(r);
    }
  }
);

//Get admin detaisl
router.get("/:id", verifyToken(UserType.ADMIN), async (req, res) => {
  const id = _.get(req, "user._id");
  try {
    logger.info("fetching admin details....");
    const adminInfo = await AdminController.getAdminDetails(id);
    logger.info("admin details fetched sucessfully.....");
    res.status(201).json(adminInfo);
  } catch (err) {
    logger.error("Error is :", err.message);
    const r = ErrorHandler.handle(err);
    res.status(r.status).json(r);
  }
});
module.exports = router;
