const Booking = require("../models/booking.model");

// Get all bookings related to a specific train by trainId
const getBookingsByTrainId = async (trainId) => {
  try {
    const bookings = await Booking.find({ trainId })
      .populate("userId", "username email phoneNumbers")
      .populate("trainId", "trainName trainNumber");
    console.log(bookings);
    return bookings;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  getBookingsByTrainId,
};
