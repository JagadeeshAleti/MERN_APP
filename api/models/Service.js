const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
  {
    service: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      required: false,
    },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Services", serviceSchema);
