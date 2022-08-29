const mongoose = require("mongoose");

const customerSchema = mongoose.Schema(
  {
    userID: { type: mongoose.Schema.Types.ObjectId },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Customers", customerSchema);
