const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { UserRepository } = require("../repositories/user.repository");

const verifyToken = async (req, res, next) => {
  const header = req.headers && req.headers.authorization;

  if (header) {
    const decode = await jwt.verify(header, process.env.TOKEN_SECRET);
    const user = await UserRepository.findUserByID(decode.userID);
    req.user = user;
    next();
  } else {
    req.user = undefined;
    next();
  }
};

module.exports = verifyToken;
