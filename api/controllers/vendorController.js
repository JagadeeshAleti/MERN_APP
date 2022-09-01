const { VendorRepository } = require("../repositories/vendor.repository");

module.exports.VendorController = {
  updateVendor: async (vendorID, { name, phoneNo }) => {
    const updatedVendor = await VendorRepository.updateVendorUser(vendorID, {
      name,
      phoneNo,
    });
    return updatedVendor;
  },
};
