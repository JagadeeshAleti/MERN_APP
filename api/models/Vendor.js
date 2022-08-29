const mongoose = require("mongoose");

const vendorSchema = mongoose.Schema(
  {
    userID: { type: mongoose.Schema.Types.ObjectId },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Vendors", vendorSchema);
