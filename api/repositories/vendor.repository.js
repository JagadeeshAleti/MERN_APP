const Vendor = require("../models/Vendor");
const logger = require("../utils/logger");

module.exports.VendorRepository = {
  findUserByVendor: async (userID) => {
    const vendorUsers = await Vendor.find({ userID });
    if (vendorUsers.length > 1) {
      logger.error("more than one record associated with the given email");
      throw new Error("more than one record asssoiciated with the given email");
    }
    return vendorUsers[0];
  },

  saveVendorUser: async ({ userInfo, email }) => {
    const vendorUser = new Vendor({
      userID: userInfo._id,
      email,
    });
    await vendorUser.save();
    logger.info("New vendor registered successfully!!!");
  },

  updateVendorUser: async (id, { email, name, phoneNo }) => {
    const vendor = {
      email,
      name,
      phoneNo,
    };
    await Vendor.findByIdAndUpdate(id, vendor);
    logger.info("Vendor updated successfullly!!!");
    return await Vendor.findById(id);
  },
};
