const router = require("express").Router();
const logger = require("../utils/logger");

const { registerValidations } = require("../middleware/register-validation");
const { loginValidations } = require("../middleware/login-validation");
const { AuthController } = require("../controllers/auth.controller");
const { ErrorHandler } = require("../utils/error");

//REGISTER
router.post("/register", registerValidations, async (req, res) => {
  try {
    const { email, username, password, usertype } = req.body;
    logger.info(`registering a new user: ${email}`);
    const userInfo = await AuthController.register({
      email,
      username,
      password,
      usertype,
    });
    logger.info(`User registered successfully with email: ${email}`);
    res.status(200).json({ userInfo });
  } catch (err) {
    logger.error(err.message);
    res.status(500).json(err);
  }
});

//LOGIN
router.post("/login", [loginValidations], async (req, res) => {
  try {
    const { email, password } = req.body;
    logger.info(`User logging in with email : ${email}`);

    const { token, refreshToken } = await AuthController.login({
      email,
      password,
    });

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      sameSite: "None",
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    logger.info("User logged in sucessfully!!!");
    res.status(200).json({ token });
  } catch (err) {
    logger.error(err.message);
    const [code, message] = ErrorHandler.handle(err);
    res.status(code).json({ message });
  }
});

module.exports = router;
