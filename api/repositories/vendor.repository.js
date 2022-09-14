const Vendor = require("../models/Vendor");
const logger = require("../utils/logger");

module.exports.VendorRepository = {
  findVendorByUserID: async (userID) => {
    logger.info(`finding vendor with userid : ${userID}`);
    const vendorUsers = await Vendor.find({ userID });
    if (vendorUsers.length > 1) {
      logger.error("more than one record associated with the given email");
      throw new Error("more than one record asssoiciated with the given email");
    }
    logger.info(`vendor found with the userid : ${userID}`);
    return vendorUsers[0];
  },

  saveVendorUser: async ({ userInfo, email }) => {
    logger.info("Saving vendor in the Vendor collection");
    const vendorUser = new Vendor({
      userID: userInfo._id,
      email,
    });
    await vendorUser.save();
    logger.info("Vendor saved in Vendor collection successfully");
  },

  updateVendorUser: async (id, { email, name, phoneNo }) => {
    logger.info("Updating vendor in vedor collection");
    const vendor = {
      email,
      name,
      phoneNo,
    };
    await Vendor.findByIdAndUpdate(id, vendor);
    logger.info("Vendor updated in vendor collection successfullly");
    return await Vendor.findById(id);
  },
};
