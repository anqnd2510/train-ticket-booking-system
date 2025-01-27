const chartService = require("../services/chart.service");

//[GET]/chart/:train_number/:date
module.exports.getReservationChart = async (req, res) => {
  try {
    const { train_number, date } = req.params;

    const chart = await chartService.getReservationChart(train_number, date);

    return res.status(200).json({
      success: true,
      message: "Reservation chart retrieved successfully",
      data: chart,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message || "Failed to retrieve reservation chart",
    });
  }
};
