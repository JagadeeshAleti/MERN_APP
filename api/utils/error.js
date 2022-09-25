const { Errors } = require("../constants/error");

module.exports.ErrorHandler = {
  handle(err) {
    if (err.message == Errors.NOT_AUTHORISED) {
      return {
        status: 401,
        message: "Not authorised",
        code: Errors.NOT_AUTHORISED,
      };
    }
    if (err.message === Errors.TOKEN_EXPIRED) {
      return {
        status: 401,
        message: "Token expired",
        code: Errors.TOKEN_EXPIRED,
      };
    }
    return {
      status: 500,
      message: "Internal server error",
      code: Errors.INTERNAL_SERVER_ERROR,
    };
  },
};
