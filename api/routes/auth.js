const router = require("express").Router();
const User = require("../models/User");

const Vendor = require("../models/Vendor");
const Admin = require("../models/Admin");
const Customer = require("../models/Customer");

const logger = require("../utils/logger");

const bcrypt = require("bcrypt");

const { registerValidations } = require("../middleware/register-validation");
const { loginValidations } = require("../middleware/login-validation");
const { AuthController } = require("../controllers/auth.controller");
const { Errors } = require("../constants/error");
const { ErrorHandler } = require("../utils/error");

const UserType = {
  VENDOR: "VENDOR",
  ADMIN: "ADMIN",
  CUSTOMER: "CUSTOMER",
};
//REGISTER
router.post("/register", [registerValidations], async (req, res) => {
  try {
    const { email, username, password, usertype } = req.body;
    logger.info(`registering a new user: ${email}`);
    const userInfo = await AuthController.register({
      email,
      username,
      password,
      usertype,
    });
    logger.info(`succecfully registered a new user: ${email}`);
    res.status(200).json({ userInfo });
  } catch (err) {
    logger.error(err.message);
    res.status(500).json(err);
  }
});

//LOGIN
router.post("/login", [loginValidations], async (req, res) => {
  try {
    logger.info("User logging in.....");
    const { email, userType, password } = req.body;
    const token = await AuthController.login({ email, userType, password });
    logger.info("User logged sucessfully!!!");
    res.status(200).json({ token });
  } catch (err) {
    logger.error(err.message);
    const [code, message] = ErrorHandler.handle(err);
    res.status(code).json({ message });
  }
});

module.exports = router;
