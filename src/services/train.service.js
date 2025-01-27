const Train = require("../models/train.model");
const TrainInstance = require("../models/train_instance.model");
// Get all trains
const getAllTrains = async () => {
  return await Train.find();
};

// Get train by id
const getTrainById = async (trainId) => {
  return await Train.findById(trainId);
};

// Get train by train number
const getTrainByTrainNumber = async (trainNumber) => {
  return await Train.findOne({ trainNumber });
};

// Get train by source and destination station
const getTrainBySourceAndDestination = async (
  sourceStationName,
  destinationStationName
) => {
  return await Train.find({ sourceStationName, destinationStationName });
};

// Get train by day of operation
const getTrainByDayOfOperation = async (dayOfOperation) => {
  return await Train.find({ daysOfOperation: dayOfOperation });
};

// Add a new train
const addTrain = async (train) => {
  return await Train.create(train);
};

// Get train information, and all bookings available
const getTrainInfo = async (trainId) => {
  const train = await getTrainById(trainId);
  if (!train) {
    throw new Error("Train not found");
  }
  const currentDate = new Date();
  const bookingInstances = await TrainInstance.find({
    trainNumber: train.trainNumber,
    journeyDate: { $gte: currentDate },
    status: { $ne: "Cancelled" },
  }).sort({ journeyDate: 1 });

  const traininfo = {
    trainDetails: {
      trainNumber: train.trainNumber,
      trainName: train.trainName,
      sourceStation: train.sourceStationName,
      destinationStation: train.destinationStationName,
      departureTime: train.sourceDepartureTime,
      duration: train.journeyDuration,
      fares: {
        AC: train.acTicketFare,
        Sleeper: train.sleeperTicketFare,
      },
    },

    availableBookings: bookingInstances.map((instance) => ({
      instanceId: instance._id,
      journeyDate: instance.journeyDate,
      status: instance.status,
      availableCoaches: instance.availableCoaches.map((coach) => ({
        coachNumber: coach.coachNumber,
        type: coach.coachType,
        availableSeats: coach.seatsAvailable,
      })),
    })),
  };
  return traininfo;
};

// Get all trains which are active booking phase
const getActiveTrains = async () => {
  const currentDate = new Date();
  const thirtyDaysFromNow = new Date();
  thirtyDaysFromNow.setDate(currentDate.getDate() + 30);

  const activeInstances = await TrainInstance.find({
    journeyDate: {
      $gte: currentDate,
      $lte: thirtyDaysFromNow,
    },
    status: "Scheduled",
  }).distinct("trainNumber");
  // Get train details for active instances
  // Aggregation Pipeline
  // Học thêm về cái này đi
  const activeTrains = await Train.aggregate([
    {
      $match: {
        trainNumber: { $in: activeInstances },
      },
    },
    {
      $lookup: {
        from: "train_instances",
        localField: "trainNumber",
        foreignField: "trainNumber",
        as: "instances",
      },
    },
    {
      $project: {
        trainNumber: 1,
        trainName: 1,
        sourceStationName: 1,
        destinationStationName: 1,
        sourceDepartureTime: 1,
        journeyDuration: 1,
        acTicketFare: 1,
        sleeperTicketFare: 1,
        availableDates: {
          $filter: {
            input: "$instances",
            as: "instance",
            cond: {
              $and: [
                { $eq: ["$$instance.status", "Scheduled"] },
                { $gte: ["$$instance.journeyDate", currentDate] },
                { $lte: ["$$instance.journeyDate", thirtyDaysFromNow] },
              ],
            },
          },
        },
      },
    },
    {
      $project: {
        trainNumber: 1,
        trainName: 1,
        sourceStationName: 1,
        destinationStationName: 1,
        sourceDepartureTime: 1,
        journeyDuration: 1,
        fares: {
          AC: "$acTicketFare",
          Sleeper: "$sleeperTicketFare",
        },
        availableDates: {
          $map: {
            input: "$availableDates",
            as: "instance",
            in: {
              date: "$$instance.journeyDate",
              availableSeats: {
                $reduce: {
                  input: "$$instance.availableCoaches",
                  initialValue: 0,
                  in: { $add: ["$$value", "$$this.seatsAvailable"] },
                },
              },
            },
          },
        },
      },
    },
  ]);
  return activeTrains;
};

// Get a list of all cities which are either source or destination
const getAllCities = async () => {
  const result = await Train.aggregate([
    {
      $project: {
        cities: ["$sourceStationName", "$destinationStationName"],
      },
    },
    // Unwind the array to create separate documents
    { $unwind: "$cities" },
    // Group to get unique cities
    { $group: { _id: "$cities" } },
    // Sort alphabetically
    { $sort: { _id: 1 } },
    // Format the output
    {
      $project: {
        _id: 0,
        cityName: "$_id",
      },
    },
  ]);
  return result;
};
module.exports = {
  getAllTrains,
  getTrainById,
  getTrainByTrainNumber,
  getTrainBySourceAndDestination,
  getTrainByDayOfOperation,
  addTrain,
  getTrainInfo,
  getActiveTrains,
  getAllCities,
};
