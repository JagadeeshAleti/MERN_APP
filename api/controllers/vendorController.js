const { UserRepository } = require("../repositories/user.repository");
const { VendorRepository } = require("../repositories/vendor.repository");

module.exports.VendorController = {
  getVednorDetails: async (userID) => {
    return await UserRepository.findUserByID(userID);
  },

  updateVendor: async (vendorID, { name, phoneNo }) => {
    const updatedVendor = await VendorRepository.updateVendorUser(vendorID, {
      name,
      phoneNo,
    });
    return updatedVendor;
  },
};
