const { string } = require("joi");
const mongoose = require("mongoose");

const vendorSchema = mongoose.Schema(
  {
    userID: { type: mongoose.Schema.Types.ObjectId },
    name: { type: String },
    phoneNo: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Vendors", vendorSchema);
