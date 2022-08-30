const User = require("../models/User");

const logger = require("../utils/logger");

module.exports.UserRepository = {
  findByEmail: async (email) => {
    const users = await User.find({ email });
    if (users.length > 1) {
      logger.error("more than one record associated with the given email");
      throw new Error("more than one record asssoiciated with the given email");
    }
    return users[0];
  },
};
