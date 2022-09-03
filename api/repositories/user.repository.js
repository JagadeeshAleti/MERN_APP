const { default: mongoose } = require("mongoose");
const User = require("../models/User");
const logger = require("../utils/logger");

module.exports.UserRepository = {
  findUserByID: async (id) => {
    const users = await User.aggregate([
      {
        $match: { _id: new mongoose.Types.ObjectId(id) },
      },
      {
        $lookup: {
          from: "vendors",
          localField: "_id",
          foreignField: "userID",
          as: "vendor",
        },
      },
    ]);
    if (users.length > 1) {
      logger.error("more than one record associated with the given Id");
      throw new Error("more than one record asssoiciated with the given Id");
    }

    const { password, ...userInfo } = users[0];
    const vendor = users[0].vendor[0];

    return {
      ...userInfo,
      vendor: vendor,
    };
  },

  findByEmail: async (email) => {
    const users = await User.find({ email });
    if (users.length > 1) {
      logger.error("more than one record associated with the given email");
      throw new Error("more than one record asssoiciated with the given email");
    }
    return users[0];
  },

  saveUser: async ({ email, username, hashedPwd, usertype }) => {
    const newUser = new User({
      email,
      username,
      password: hashedPwd,
      usertype,
    });

    await newUser.save();
    return newUser;
  },
};
