const Customer = require("../models/Customer");
const logger = require("../utils/logger");

module.exports.CustomerRepository = {
  findUserByCustomer: async (userID) => {
    const customerUsers = await Customer.find({ userID });
    if (customerUsers.length > 1) {
      logger.error("more than one record associated with the given email");
      throw new Error("more than one record asssoiciated with the given email");
    }
    return customerUsers[0];
  },

  saveCustomerUser: async ({ userInfo, email }) => {
    const customerUser = new Customer({
      userID: userInfo._id,
      email,
    });

    customerUser.save();
    logger.info("New customer registered successfully!!!");
  },
};
