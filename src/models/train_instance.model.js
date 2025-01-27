const mongoose = require("mongoose");

const trainInstanceSchema = new mongoose.Schema({
  trainNumber: {
    type: String,
    required: true,
    ref: "Train",
  },
  journeyDate: {
    type: Date,
    required: true,
  },
  availableCoaches: [
    {
      coachNumber: { type: String, required: true },
      coachType: {
        type: String,
        enum: ["AC", "Sleeper"],
        required: true,
      },
      seatsAvailable: { type: Number, required: true },
      // cố định số seat trong mỗi hàng coach
      // tuong ứng số seat của coach.model.js

      // tránh số seat của coach.model.js
      // nhiều hơn số seat của train_instance.model.js
    },
  ],
  status: {
    type: String,
    enum: ["Scheduled", "Running", "Cancelled", "Completed"],
    default: "Scheduled",
  },
});

const TrainInstance = mongoose.model(
  "TrainInstance",
  trainInstanceSchema,
  "train_instances"
);

module.exports = TrainInstance;
