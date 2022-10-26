const { UserRepository } = require("../repositories/user.repository");
const { VendorRepository } = require("../repositories/vendor.repository");
const logger = require("../utils/logger");

module.exports.VendorController = {
  getAllVednors: async () => {
    return await VendorRepository.getAllVednors();
  },

  getVednorDetails: async (userID, type) => {
    return await UserRepository.findUserByID(userID);
  },

  updateVendor: async (vendorID, { name, phoneNo }) => {
    return await VendorRepository.updateVendorUser(vendorID, {
      name,
      phoneNo,
    });
  },
};
