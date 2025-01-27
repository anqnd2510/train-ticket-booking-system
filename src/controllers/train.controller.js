const trainService = require("../services/train.service");

//[GET]/trains/list
module.exports.getAllTrains = async (req, res) => {
  try {
    const trains = await trainService.getAllTrains();
    res.status(200).json({
      success: true,
      data: trains,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

//[POST]/trains/add
module.exports.addTrain = async (req, res) => {
  const train = req.body;
  if (!train) {
    return res.status(400).json({
      success: false,
      error: "Train details are required",
    });
  }
  try {
    const newTrain = await trainService.addTrain(train);
    res.status(201).json({
      success: true,
      data: newTrain,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

//[GET]/trains/info/:id
module.exports.getTrainInfo = async (req, res) => {
  try {
    const trainId = req.params.id;
    if (!trainId) {
      return res.status(400).json({
        success: false,
        error: "Train id is not found",
      });
    }
    const trainInfo = await trainService.getTrainInfo(trainId);
    console.log(trainInfo);
    res.status(200).json({
      success: true,
      data: trainInfo,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};

//[GET]/trains/current/active
module.exports.getActiveTrains = async (req, res) => {
  try {
    const activeTrains = await trainService.getActiveTrains();
    res.status(200).json({
      success: true,
      data: activeTrains,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

//[GET]/trains/cities/all
module.exports.getAllCities = async (req, res) => {
  try {
    const cities = await trainService.getAllCities();
    return res.status(200).json({
      success: true,
      data: cities,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};
