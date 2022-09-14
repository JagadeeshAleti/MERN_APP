const Admin = require("../models/Admin");
const logger = require("../utils/logger");

module.exports.AdminRepository = {
  findAdminByUserID: async (userID) => {
    logger.info(`finding admin with userid : ${userID}`);
    const adminUsers = await Admin.find({ userID });
    if (adminUsers.length > 1) {
      logger.error("more than one record associated with the given email");
      throw new Error("more than one record asssoiciated with the given email");
    }
    logger.info(`admin found with the userid : ${userID}`);
    return adminUsers[0];
  },

  saveAdminUser: async ({ userInfo, email }) => {
    logger.info("Saving admin in the Admin collection");
    const adminUser = new Admin({
      userID: userInfo._id,
      email,
    });

    adminUser.save();
    logger.info("Admin saved in admin collection successfully");
  },
};
