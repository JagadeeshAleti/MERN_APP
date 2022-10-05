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
          if (e instanceof jwt.TokenExpiredError) {
            throw new Error("TOKEN_EXPIRED");
          }
          logger.error(e.message);
        }
        console.log("Token payload : ", decode);
        if (!decode) {
          throw new Error("NOT_AUTHORISED");
        }
        const user = await UserRepository.findUserByID(decode.userID, type);

        if (user.usertype === type) {
          req.user = user;
          return next();
        }
        throw new Error("NOT_AUTHORISED");
      } else {
        throw new Error("NOT_AUTHORISED");
      }
    } catch (err) {
      const r = ErrorHandler.handle(err);
      res.status(r.status).json(r);
    }
  };
};

module.exports = verifyToken;
