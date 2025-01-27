const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Account",
    required: true,
  },
  tickets: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ticket",
      required: true,
    },
  ],
  totalAmount: {
    type: Number,
    required: true,
  },
  paymentStatus: {
    type: String,
    enum: ["Paid", "Failed", "Pending"],
    required: true,
  },
  bookingTimestamp: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["Confirmed", "Partially_Cancelled", "Cancelled"],
    required: true,
  },
});

const Booking = mongoose.model("Booking", bookingSchema, "bookings");

module.exports = Booking;
