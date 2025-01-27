const mongoose = require("mongoose");

const coachSchema = new mongoose.Schema({
  coachNumber: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  trainNumber: {
    type: String,
    required: true,
    ref: "Train",
  },
  coachType: {
    type: String,
    enum: ["AC", "Sleeper"],
    required: true,
  },
  seats: [
    {
      seatNumber: { type: Number, required: true },
      isAvailable: { type: Boolean, default: true },
    },
    // tức là seat của cái coach này, khi tạo seats cần cân nhắc
    // seatsAvailable bên availableCoaches của train_instance.model.js
    // để tránh trường hợp số seat của coach.model.js
    // nhiều hơn số seat của train_instance.model.js
  ],
});

const Coach = mongoose.model("Coach", coachSchema, "coaches");

module.exports = Coach;
