const Customer = require("../models/Customer");
const logger = require("../utils/logger");

module.exports.CustomerRepository = {
  findCustomerByUserID: async (userID) => {
    logger.info(`finding customer with userid : ${userID}`);
    const customerUsers = await Customer.find({ userID });
    if (customerUsers.length > 1) {
      logger.error("more than one record associated with the given email");
      throw new Error("more than one record asssoiciated with the given email");
    }
    if (customerUsers.length === 0) {
      logger.info(`customer not found with the userid : ${userID}`);
      return;
    }

    logger.info(`customer found with the userid : ${userID}`);
    return customerUsers[0];
  },

  saveCustomerUser: async ({ userInfo, email }) => {
    logger.info("Saving customer in the Customer collection");
    const customerUser = new Customer({
      userID: userInfo._id,
      email,
    });

    customerUser.save();
    logger.info("Customer saved in Customer collection successfully");
  },
};
