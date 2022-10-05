const mongoose = require("mongoose");

const adminSchema = mongoose.Schema(
  {
    userID: { type: mongoose.Schema.Types.ObjectId },
    name: { type: String },
    phoneNo: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Admins", adminSchema);
