const router = require("express").Router();
const logger = require("../utils/logger");
const _ = require("lodash");

const { registerValidations } = require("../middleware/register-validation");
const { loginValidations } = require("../middleware/login-validation");
const { AuthController } = require("../controllers/auth.controller");
const { ErrorHandler } = require("../utils/error");

//REGISTER
router.post("/register", registerValidations, async (req, res) => {
  try {
    const { email, username, password, usertype } = req.body;
    logger.info(`/register : registering a new user: ${email}`);
    const userInfo = await AuthController.register({
      email,
      username,
      password,
      usertype,
    });
    logger.info(
      `/register : User registered successfully with email: ${email}`
    );
    res.status(200).json({ userInfo });
  } catch (err) {
    logger.error(`/register: error ${err.message}`);
    const resp = ErrorHandler.handle(err);
    res.status(resp.status).json(resp);
  }
});

//LOGIN
router.post("/login", loginValidations, async (req, res) => {
  try {
    const { email, password, userType } = req.body;
    logger.info(`/login: User logging in with email : ${email}`);

    const { token, refreshToken } = await AuthController.login({
      email,
      password,
      userType,
    });

    logger.info("/login: User logged in sucessfully!!!");
    res.status(200).json({ token, refreshToken });
  } catch (err) {
    logger.error(`/login: error ${err.message}`);
    const resp = ErrorHandler.handle(err);
    res.status(resp.status).json(resp);
  }
});

router.post("/refreshToken", async (req, res) => {
  try {
    logger.info("/refreshTokne:  generating new token using refresh token....");
    const refreshToken = _.get(req, "headers.authorization");
    const { newToken, newRefreshToken } = await AuthController.refreshToken(
      refreshToken
    );
    res.status(200).json({ newToken, newRefreshToken });
  } catch (err) {
    logger.error(`/login: error ${err.message}`);
    const resp = ErrorHandler.handle(err);
    res.status(resp.status).json(resp);
  }
});
module.exports = router;
