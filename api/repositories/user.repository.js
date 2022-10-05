const { default: mongoose } = require("mongoose");
const User = require("../models/User");
const logger = require("../utils/logger");

module.exports.UserRepository = {
  findUserByID: async (id, type) => {
    let collection = {};
    logger.info(`finding user with id : ${id}`);

    if (type === "VENDOR") {
      collection = {
        name: "vendors",
        as: "vendor",
      };
    } else if (type === "ADMIN") {
      collection = {
        name: "admins",
        as: "admin",
      };
    } else if (type === CUSTOMER) {
      collection = {
        name: "customers",
        as: "customer",
      };
    }

    const users = await User.aggregate([
      {
        $match: { _id: new mongoose.Types.ObjectId(id) },
      },
      {
        $lookup: {
          from: collection.name,
          localField: "_id",
          foreignField: "userID",
          as: collection.as,
        },
      },
    ]);

    if (users.length > 1) {
      logger.error("more than one record associated with the given Id");
      throw new Error("more than one record asssoiciated with the given Id");
    }

    const { password, ...userInfo } = users[0];
    return {
      ...userInfo,
    };
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
