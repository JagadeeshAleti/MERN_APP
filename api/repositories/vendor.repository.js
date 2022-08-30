const Vendor = require("../models/Vendor");
const logger = require("../utils/logger");

module.exports.VendorRepository = {
  findUserByVendor: async (user) => {
    const vendorUsers = await Vendor.find({ userID: user._id });
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
};
