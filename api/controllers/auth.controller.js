const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const { UserRepository } = require("../repositories/user.repository");
const { VendorRepository } = require("../repositories/vendor.repository");
const { AdminRepository } = require("../repositories/admin.repository");
const { CustomerRepository } = require("../repositories/customer.repository");

const { Errors } = require("../constants/error");
const Vendor = require("../models/Vendor");

const UserType = {
  VENDOR: "VENDOR",
  ADMIN: "ADMIN",
  CUSTOMER: "CUSTOMER",
};

module.exports.AuthController = {
  login: async ({ email, userType, password }) => {
    const user = await UserRepository.findByEmail(email);
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new Error(Errors.NOT_AUTHORISED);
    }

    let mainUser;
    if (userType === UserType.VENDOR) {
      mainUser = await VendorRepository.findUserByVendor(user);
    }
    if (userType === UserType.ADMIN) {
      mainUser = await AdminRepository.findUserByAdmin(user);
    }

    if (userType === UserType.CUSTOMER) {
      mainUser = await CustomerRepository.findUserByCustomer(user);
    }

    if (user && !mainUser) {
      throw new Error(Errors.NOT_AUTHORISED);
    }

    if (!mainUser) {
      throw new Error(Errors.NOT_AUTHORISED);
    }

    const { userPassword, ...userInfo } = user._doc;

    const token = jwt.sign(
      {
        email: userInfo.email,
        type: userType,
        userID: JSON.stringify(user._id),
        refUserID: JSON.stringify(mainUser._id),
      },
      process.env.TOKEN_SECRET,
      {
        expiresIn: "1800s",
      }
    );

    return token;
  },
};
