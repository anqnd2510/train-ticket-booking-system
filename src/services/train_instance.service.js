const TrainInstance = require("../models/train_instance.model");
const Train = require("../models/train.model");

const createTrainInstance = async (trainInstanceData) => {
  const train = await Train.findOne({
    trainNumber: trainInstanceData.trainNumber,
  });
  if (!train) {
    throw new Error("Train not found");
  }
  // Check if booking instance already exists for this train and date
  const existingInstance = await TrainInstance.findOne({
    trainNumber: trainInstanceData.trainNumber,
    journeyDate: new Date(trainInstanceData.journeyDate),
  });
  if (existingInstance) {
    throw new Error("Train instance already exists for this date");
  }
  const trainInstance = new TrainInstance({
    trainNumber: trainInstanceData.trainNumber,
    journeyDate: new Date(trainInstanceData.journeyDate),
    availableCoaches: trainInstanceData.availableCoaches,
    status: trainInstanceData.status || "Scheduled",
  });
  return await trainInstance.save();
};

module.exports = {
  createTrainInstance,
};
