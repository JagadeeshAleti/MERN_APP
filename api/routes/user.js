const router = require("express").Router();
const User = require("../models/User");

const bcrypt = require("bcrypt");
const emailValidator = require("email-validator");
const passwordValidator = require("password-validator");

router.post("/register", async (req, res) => {
  try {
    const { email, username, password, confirmPassword } = req.body;

    const isvalidEmail = emailValidator.validate(email);
    if (!isvalidEmail) {
      return res.send({ msg: "Not a valid Email" });
    }

    const passwordSchema = new passwordValidator();
    passwordSchema
      .is()
      .min(8)
      .is()
      .max(100)
      .has()
      .uppercase()
      .has()
      .lowercase()
      .has()
      .digits(2)
      .has()
      .not()
      .spaces()
      .is()
      .not()
      .oneOf(["Passw0rd", "Password123"]);

    const isValidPwd =
      passwordSchema.validate(password) &&
      passwordSchema.validate(confirmPassword);

    if (!isValidPwd) {
      return res.send({ msg: "Not a valid password" });
    }

    if (!(password === confirmPassword)) {
      return res.send({ err: "Password and confirm password are not same" });
    }

    const exsitedEmail = await User.find({ email });
    if (exsitedEmail.length >= 1) {
      return res.send({ mag: "Email already taken!!!" });
    }

    const exsitedUsername = await User.find({ username });
    if (exsitedUsername.length >= 1) {
      return res.send({ mag: "Username already taken!!" });
    }

    const existedUser = await User.find({ email, username });
    if (existedUser.length >= 1) {
      return res.status(409).json("User alreay existed");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPwd = await bcrypt.hash(password, salt);

    const newUser = new User({
      email,
      username,
      password: hashedPwd,
    });

    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
