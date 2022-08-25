const router = require("express").Router();
const User = require("../models/User");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { registerValidations } = require("../middleware/register-validation");
const { loginValidations } = require("../middleware/login-validation");

//REGISTER
router.post("/register", [registerValidations], async (req, res) => {
  try {
    const { email, username } = req.body;
    console.log("registering a new user: ", email);

    const salt = await bcrypt.genSalt(10);
    const hashedPwd = await bcrypt.hash(req.body.password, salt);

    const newUser = new User({
      email,
      username,
      password: hashedPwd,
    });

    const user = await newUser.save();
    const { password, ...userInfo } = user._doc;

    console.log("succecfully registered a new user: ", email);
    res.status(200).json(userInfo);
  } catch (err) {
    res.status(500).json(err);
  }
});

//LOGIN
router.post("/login", [loginValidations], async (req, res) => {
  try {
    console.log("User logging in.....");

    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({ msg: "No user exists with this mail" });
    }

    const valid = await bcrypt.compare(req.body.password, user.password);
    if (!valid) {
      return res.status(400).json({ msg: "Invalid password" });
    }
    const { password, ...userInfo } = user._doc;

    const token = jwt.sign(
      { email: userInfo.email },
      process.env.TOKEN_SECRET,
      {
        expiresIn: "1800s",
      }
    );
    console.log("User logged sucessfully!!!");
    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
