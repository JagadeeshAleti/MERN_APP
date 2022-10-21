const { default: mongoose, Collection } = require("mongoose");
const Admin = require("../models/Admin");
const Customer = require("../models/Customer");
const User = require("../models/User");
const Vendor = require("../models/Vendor");
const logger = require("../utils/logger");
const _ = require("lodash");

module.exports.UserRepository = {
  findUserByID: async (id) => {
    let collection = {};

    logger.info(`finding user with id : ${id}`);
    const user = await User.findById(id);

    if (user.usertype === "VENDOR") {
      collection = { model: Vendor, as: "vendor" };
    } else if (user.usertype === "ADMIN") {
      collection = { model: Admin, as: "admin" };
    } else if (user.usertype === "CUSTOMER") {
      collection = { model: Customer, as: "customer" };
    }

    const { password, ...userDetails } = user._doc;
    const subTypeDetails = await collection.model.find({ userID: user._id });

    return { ...userDetails, [collection.as]: subTypeDetails };
  },

  findByEmail: async (email) => {
    logger.info(`finding a user with email : ${email}`);
    const users = await User.find({ email });
    if (users.length > 1) {
      logger.error("more than one record associated with the given email");
      throw new Error("more than one record asssoiciated with the given email");
    }
    logger.info(`User found with email: ${email}`);
    return users[0];
  },

  saveUser: async ({ email, username, hashedPwd, usertype }) => {
    logger.info("Saving the user in the User collection.");
    const newUser = new User({
      email,
      username,
      password: hashedPwd,
      usertype,
    });

    await newUser.save();
    logger.info("User saved in User collection successfully.");
    return newUser;
  },
};
