const _ = require("lodash");
const jwt = require("jsonwebtoken");
const { UserRepository } = require("../repositories/user.repository");
const { ErrorHandler } = require("../utils/error");

const verifyToken = (type) => {
  return async (req, res, next) => {
    try {
      const header = _.get(req, "headers.authorization");

      if (header) {
        const decode = await jwt.verify(header, process.env.TOKEN_SECRET);
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
