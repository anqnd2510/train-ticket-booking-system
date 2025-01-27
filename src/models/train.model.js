const mongoose = require("mongoose");

const trainSchema = new mongoose.Schema({
  trainNumber: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  trainName: {
    type: String,
    required: true,
    trim: true,
  },
  sourceStationName: {
    type: String,
    required: true,
    trim: true,
  },
  destinationStationName: {
    type: String,
    required: true,
    trim: true,
  },
  sourceDepartureTime: {
    type: String,
    required: true,
  },
  journeyDuration: {
    type: String,
    required: true,
  },
  acTicketFare: {
    type: Number,
    required: true,
  },
  sleeperTicketFare: {
    type: Number,
    required: true,
  },
});

const Train = mongoose.model("Train", trainSchema, "trains");

module.exports = Train;
