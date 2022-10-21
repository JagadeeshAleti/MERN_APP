const router = require("express").Router();
const logger = require("../utils/logger");
const _ = require("lodash");

const { CustomerController } = require("../controllers/customer.controller");
const { customerValidations } = require("../middleware/customer-validations");
const { ErrorHandler } = require("../utils/error");
const { UserType } = require("../constants/user-types");

const verifyToken = require("../middleware/authJWT");

// Authorization
router.put(
  "/:id",
  [customerValidations, verifyToken(UserType.CUSTOMER)],
  async (req, res) => {
    const customerID = _.get(req, "user.customer[0]._id");
    const { name, phoneNo } = req.body;
    console.log(customerID);
    try {
      logger.info("updating customer details.....");
      const updatedCustomer = await CustomerController.updateCustomer(
        customerID,
        {
          name,
          phoneNo,
        }
      );
      logger.info("customer updated successfully.");
      res.status(200).json(updatedCustomer);
    } catch (err) {
      logger.error(err.message);
      const r = ErrorHandler.handle(err);
      res.status(r.status).json(r);
    }
  }
);

//Get customer detaisl
router.get("/:id", verifyToken(UserType.CUSTOMER), async (req, res) => {
  const id = req.user._id;
  try {
    logger.info("fetching customer details....");
    const customerInfo = await CustomerController.getCustomerDetails(
      id,
      "CUSTOMER"
    );
    logger.info("Customer details fetched sucessfully.....");
    res.status(201).json(customerInfo);
  } catch (err) {
    logger.error("Error is :", err.message);
    const r = ErrorHandler.handle(err);
    res.status(r.status).json(r);
  }
});

module.exports = router;
