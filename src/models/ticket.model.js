const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Account",
    required: true,
  },
  pnrNumber: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  trainNumber: {
    type: String,
    required: true,
  },
  journeyDate: {
    type: Date,
    required: true,
  },
  passengerName: {
    type: String,
    required: true,
    trim: true,
  },
  passengerGender: {
    type: String,
    enum: ["Male", "Female", "Other"],
    required: true,
  },
  coachNumber: {
    type: String,
    required: true,
  },
  coachType: {
    type: String,
    enum: ["AC", "Sleeper"],
    required: true,
  },
  seatNumber: {
    type: Number,
    required: true,
  },
  ticketFare: {
    type: Number,
    required: true,
  },
  bookingStatus: {
    type: String,
    enum: ["Confirmed", "Cancelled"],
    required: true,
  },
  cancellationTimestamp: {
    type: Date,
    default: null, // Chỉ lưu khi vé bị hủy
  },
});

const Ticket = mongoose.model("Ticket", ticketSchema, "tickets");

module.exports = Ticket;
