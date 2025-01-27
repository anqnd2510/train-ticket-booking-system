const Coach = require("../models/coach.model");
const Train = require("../models/train.model");
const TrainInstance = require("../models/train_instance.model");
const {
  generateSeatsForCoach,
} = require("../utils/generateSeatsForCoach.util");

// Create a new coach
const addCoach = async (coachData) => {
  const seats = generateSeatsForCoach(coachData.coachType);
  const newCoach = new Coach({
    ...coachData,
    seats,
  });
  return await newCoach.save();
};

// Update train instances with the new coach
const updateTrainInstances = async (
  trainNumber,
  coachNumber,
  coachType,
  seats
) => {
  const currentDate = new Date();
  const futureInstances = await TrainInstance.find({
    trainNumber,
    journeyDate: { $gte: currentDate },
    status: { $in: ["Scheduled", "Running", "Cancelled", "Completed"] },
  });
  const updatePromises = futureInstances.map((instance) => {
    const availableSeats = seats.filter((seat) => seat.isAvailable).length;

    const existingCoachIndex = instance.availableCoaches.findIndex(
      (coach) => coach.coachNumber === coachNumber
    );

    if (existingCoachIndex === -1) {
      instance.availableCoaches.push({
        coachNumber,
        coachType,
        seatsAvailable: availableSeats,
      });
    }

    return instance.save();
  });

  await Promise.all(updatePromises);
};

// See all coaches for a train
const getCoachesForTrain = async (trainNumber) => {
  const coaches = await Coach.find({ trainNumber });
  return coaches.map((coach) => ({
    coachNumber: coach.coachNumber,
    coachType: coach.coachType,
  }));
};

// See details of a coach
const getCoachDetails = async (coachNumber) => {
  return await Coach.findOne({ coachNumber });
};

module.exports = {
  addCoach,
  updateTrainInstances,
  getCoachesForTrain,
  getCoachDetails,
};
