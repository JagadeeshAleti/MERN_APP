const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const { UserRepository } = require("../repositories/user.repository");
const { VendorRepository } = require("../repositories/vendor.repository");
const { AdminRepository } = require("../repositories/admin.repository");
const { CustomerRepository } = require("../repositories/customer.repository");

const { Errors } = require("../constants/error");
const { UserType } = require("../constants/user-types");
const logger = require("../utils/logger");

module.exports.AuthController = {
  login: async ({ email, password }) => {
    logger.info("Inside login controller.");

    const user = await UserRepository.findByEmail(email);
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new Error(Errors.NOT_AUTHORISED);
    }

    let mainUser;
    if (user.usertype === UserType.VENDOR) {
      mainUser = await VendorRepository.findVendorByUserID(user._id);
    }
    if (user.usertype === UserType.ADMIN) {
      mainUser = await AdminRepository.findAdminByUserID(user._id);
    }

    if (user.usertype === UserType.CUSTOMER) {
      mainUser = await CustomerRepository.findCustomerByUserID(user._id);
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
        userID: user._id,
        refUserID: mainUser._id,
      },
      process.env.TOKEN_SECRET,
      {
        expiresIn: "12000s",
      }
    );

    const refreshToken = jwt.sign(
      {
        email: userInfo.email,
        userID: user._id,
        refUserID: mainUser._id,
      },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: "3600s",
      }
    );
    logger.info("login controller executed successfully!");
    return { token, refreshToken };
  },

  register: async ({ email, username, password, usertype }) => {
    logger.info("Inside register controller");
    const salt = await bcrypt.genSalt(10);
    const hashedPwd = await bcrypt.hash(password, salt);

    const user = await UserRepository.saveUser({
      email,
      username,
      hashedPwd,
      usertype,
    });

    const { password: userPassword, ...userInfo } = user._doc;

    if (usertype === UserType.VENDOR) {
      await VendorRepository.saveVendorUser({ userInfo, email });
    }

    if (usertype === UserType.ADMIN) {
      AdminRepository.saveAdminUser({ userInfo, email });
    }

    if (usertype === UserType.CUSTOMER) {
      CustomerRepository.saveCustomerUser({ userInfo, email });
    }
    logger.info("register controller executed successfully");
    return userInfo;
  },
};
