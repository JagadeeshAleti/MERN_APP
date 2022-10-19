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
  login: async ({ email, password, userType }) => {
    logger.info("Inside login controller.");
    const user = await UserRepository.findByEmail(email);
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new Error(Errors.NOT_AUTHORISED);
    }

    let mainUser;
    if (userType === UserType.VENDOR) {
      mainUser = await VendorRepository.findVendorByUserID(user._id);
    }
    if (userType === UserType.ADMIN) {
      mainUser = await AdminRepository.findAdminByUserID(user._id);
    }

    if (userType === UserType.CUSTOMER) {
      mainUser = await CustomerRepository.findCustomerByUserID(user._id);
    }

    if (user && !mainUser) {
      throw new Error(Errors.NOT_AUTHORISED);
    }

    const { password: userPassword, ...userInfo } = user._doc;
    const token = jwt.sign(
      {
        email: userInfo.email,
        userID: user._id,
        refUserID: mainUser._id,
      },
      process.env.TOKEN_SECRET,
      {
        expiresIn: "360s",
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
        expiresIn: "72h",
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

  refreshToken: async (refreshToken) => {
    if (refreshToken) {
      logger.info("decoding refresh token.......");
      let userInfo;
      try {
        userInfo = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        logger.info("refresh token decoded successfully!");
        const newToken = jwt.sign(
          {
            email: userInfo.email,
            userID: userInfo.userID,
            refUserID: userInfo.refUserID,
          },
          process.env.TOKEN_SECRET,
          {
            expiresIn: "360s",
          }
        );

        const newRefreshToken = jwt.sign(
          {
            email: userInfo.email,
            userID: userInfo.userID,
            refUserID: userInfo.refUserID,
          },
          process.env.REFRESH_TOKEN_SECRET,
          {
            expiresIn: "72h",
          }
        );
        return { newToken, newRefreshToken };
      } catch (e) {
        logger.error(e.message);
      }
      if (!userInfo) {
        throw new Error("NOT_AUTHORISED");
      }
    }
  },
};
