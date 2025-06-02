const mongoose = require("mongoose");

const StaffSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      required: true,
    },
    age: {
      type: Number,
      required: true,
      min: 18,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.models.Staff || mongoose.model("Staff", StaffSchema);
