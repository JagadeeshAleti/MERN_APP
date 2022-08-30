const Admin = require("../models/Admin");

module.exports.AdminRepository = {
  findUserByAdmin: async (user) => {
    const adminUsers = await Admin.find({ userID: user._id });
    if (adminUsers.length > 1) {
      logger.error("more than one record associated with the given email");
      throw new Error("more than one record asssoiciated with the given email");
    }
    return adminUsers[0];
  },
};
