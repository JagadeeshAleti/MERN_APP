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
    if (adminUsers.length === 0) {
      logger.info(`admin not found with the userid : ${userID}`);
      return;
    }
    logger.info(`admin found with the userid : ${userID}`);
    return adminUsers[0];
  },

  findAdminByEmail: async (email) => {
    logger.info(`findind admin with email ${email}`);
    const admin = await Admin.find({ email });
    if (admin.length > 1) {
      logger.error("more than one record associated with the given email");
      throw new Error("more than one record asssoiciated with the given email");
    }
    admin.length === 1
      ? logger.info(`admin found with email : ${email}`)
      : logger.info(`admin not found with email : ${email}`);
    return admin[0];
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

  updateAdminUser: async (id, { name, phoneNo }) => {
    logger.info("Updating admin in admin collection");
    const admin = {
      name,
      phoneNo,
    };
    await Admin.findByIdAndUpdate(id, admin);
    logger.info("admin updated in vendor collection successfullly");
    return await Admin.findById(id);
  },
};
