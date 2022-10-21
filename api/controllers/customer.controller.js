const { UserRepository } = require("../repositories/user.repository");
const { CustomerRepository } = require("../repositories/customer.repository");
const logger = require("../utils/logger");

module.exports.CustomerController = {
  getCustomerDetails: async (userID, type) => {
    return await UserRepository.findUserByID(userID, type);
  },

  updateCustomer: async (customerID, { name, phoneNo }) => {
    return await CustomerRepository.updateCustomerUser(customerID, {
      name,
      phoneNo,
    });
  },
};
