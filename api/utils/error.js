const { Errors } = require("../constants/error");

module.exports.ErrorHandler = {
  handle(err) {
    if (err.message == Errors.NOT_AUTHORISED) {
      return [401, Errors.NOT_AUTHORISED];
    }
    return [500, Errors.INTERNAL_SERVER_ERROR];
  },
};
