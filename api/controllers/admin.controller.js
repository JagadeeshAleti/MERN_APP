const { AdminRepository } = require("../repositories/admin.repository");
const { UserRepository } = require("../repositories/user.repository");

module.exports.AdminController = {
  getAdminDetails: async (userID, type) => {
    return await UserRepository.findUserByID(userID, type);
  },

  updateAdmin: async (adminID, { name, phoneNo }) => {
    return await AdminRepository.updateAdminUser(adminID, {
      name,
      phoneNo,
    });
  },
};
