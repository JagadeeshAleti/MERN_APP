const Admin = require("../models/Admin");
const logger = require("../utils/logger");

module.exports.AdminRepository = {
  findUserByAdmin: async (userID) => {
    const adminUsers = await Admin.find({ userID });
    if (adminUsers.length > 1) {
      logger.error("more than one record associated with the given email");
      throw new Error("more than one record asssoiciated with the given email");
    }
    return adminUsers[0];
  },

  saveAdminUser: async ({ userInfo, email }) => {
    const adminUser = new Admin({
      userID: userInfo._id,
      email,
    });

    adminUser.save();
    logger.info("New admin registered successfully!!!");
  },
};
