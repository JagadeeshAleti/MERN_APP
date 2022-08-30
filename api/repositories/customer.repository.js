const Customer = require("../models/Customer");

module.exports.CustomerRepository = {
  findUserByCustomer: async (user) => {
    const customerUsers = await Customer.find({ userID: user._id });
    if (customerUsers.length > 1) {
      logger.error("more than one record associated with the given email");
      throw new Error("more than one record asssoiciated with the given email");
    }
    return customerUsers[0];
  },
};
