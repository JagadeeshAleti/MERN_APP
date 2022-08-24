const router = require("express").Router();
const User = require("../models/User");

const bcrypt = require("bcrypt");
const { registerValidations } = require("../middleware/register-validation");

router.post("/register", [registerValidations], async (req, res) => {
  try {
    const { email, username, password } = req.body;
    console.log("registering a new user: ", email);

    const salt = await bcrypt.genSalt(10);
    const hashedPwd = await bcrypt.hash(password, salt);

    const newUser = new User({
      email,
      username,
      password: hashedPwd,
    });

    const user = await newUser.save();
    console.log("succecfully registered a new user: ", email);
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
