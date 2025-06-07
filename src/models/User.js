// models/User.js
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: {
    type: String,
    enum: ["doctor", "staff", "patient"],
    default: "patient",
  },
  status: {
    type: String,
    enum: ["approved", "pending"],
    default: function () {
      return this.role === "patient" ? "approved" : "pending";
    },
  },
  gender: { type: String, enum: ["male", "female", "other"], required: true },
  age: { type: Number, min: 18, required: true },
  refreshToken: { type: String, default: null },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
