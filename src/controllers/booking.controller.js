const bookingService = require("../services/booking.service");

//[GET]/bookings/train/:trainId
module.exports.getBookingsByTrainId = async (req, res) => {
  try {
    const { trainId } = req.params;
    const bookings = await bookingService.getBookingsByTrainId(trainId);
    console.log(bookings);
    if (!bookings || bookings.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No bookings available for this train",
      });
    }
    res.status(200).json({
      success: true,
      data: bookings,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
