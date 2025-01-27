const trainInstanceService = require("../services/train_instance.service");

//[POST]/train-instances/addbookinginstance
module.exports.addBookingInstance = async (req, res) => {
  try {
    const trainInstanceData = await trainInstanceService.createTrainInstance(
      req.body
    );
    return res.status(201).json({
      success: true,
      data: trainInstanceData,
    });
  } catch (error) {
    if (error.message === "Train not found") {
      return res.status(404).json({
        success: false,
        error: "Train with given number does not exist",
      });
    }

    if (error.message === "Booking instance already exists") {
      return res.status(400).json({
        success: false,
        error: "A booking instance for this train and date already exists",
      });
    }

    console.error("Error creating train instance:", error);
    return res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};
