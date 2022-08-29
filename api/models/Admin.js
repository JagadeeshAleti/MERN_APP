const mongoose = require("mongoose");

const adminSchema = mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Admins", adminSchema);
