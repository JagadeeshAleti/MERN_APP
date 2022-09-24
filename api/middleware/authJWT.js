const _ = require("lodash");
const jwt = require("jsonwebtoken");
const { UserRepository } = require("../repositories/user.repository");
const { ErrorHandler } = require("../utils/error");
const logger = require("../utils/logger");

const verifyToken = (type) => {
  return async (req, res, next) => {
    try {
      const header = _.get(req, "headers.authorization");

      if (header) {
        logger.info("decoding token.......");
        let decode;
        try {
          decode = await jwt.verify(header, process.env.TOKEN_SECRET);
          logger.info("token decoded successfully!");
        } catch (e) {
          logger.error(e.message);
        }

        if (!decode) {
          throw new Error("NOT_AUTHORISED");
        }
        console.log(decode);
        const user = await UserRepository.findUserByID(decode.userID);
        if (user.usertype === type) {
          req.user = user;
          return next();
        }
        throw new Error("NOT_AUTHORISED");
      } else {
        throw new Error("NOT_AUTHORISED");
      }
    } catch (err) {
      const [code, message] = ErrorHandler.handle(err);
      res.status(code).json({ message });
    }
  };
};

module.exports = verifyToken;
