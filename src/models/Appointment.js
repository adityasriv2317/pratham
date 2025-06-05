const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  specialization: {
    type: String,
    required: true,
    trim: true,
  },
  doctor: {
    type: String,
    required: true,
    trim: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  timeSlot: {
    type: String,
    required: true,
  },
  appointmentType: {
    type: String,
    required: true,
    enum: ["online", "offline"],
  },
  reason: {
    type: String,
    required: true,
    trim: true,
  },
  status: {
    type: String,
    enum: ["booked", "completed", "cancelled"],
    default: "booked",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports =
  mongoose.models.Appointment ||
  mongoose.model("Appointment", appointmentSchema);
