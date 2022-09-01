const { VendorRepository } = require("../repositories/vendor.repository");

module.exports.VendorController = {
  updateVendor: async ({ email, name, phoneNo, userID }) => {
    const updatedVendor = await VendorRepository.updateVendorUser({
      email,
      name,
      phoneNo,
      userID,
    });
    return updatedVendor;
  },
};
