const TrainInstance = require("../models/train_instance.model");

const getReservationChart = async (trainNumber, journeyDate) => {
  const result = await TrainInstance.aggregate([
    {
      $match: {
        trainNumber: trainNumber,
        journeyDate: new Date(journeyDate),
      },
    },
    {
      $lookup: {
        from: "trains",
        localField: "trainNumber",
        foreignField: "trainNumber",
        as: "trainDetails",
      },
    },
    // unwind is used to deconstruct the trainDetails array
    {
      $unwind: "$trainDetails",
    },
    {
      $lookup: {
        from: "coaches",
        let: { trainNum: "$trainNumber" },
        pipeline: [
          {
            $match: {
              $expr: { $eq: ["$trainNumber", "$$trainNum"] },
            },
          },
        ],
        as: "coachDetails",
      },
    },
    {
      $project: {
        trainDetails: {
          trainNumber: "$trainDetails.trainNumber",
          trainName: "$trainDetails.trainName",
          sourceStation: "$trainDetails.sourceStationName",
          destinationStation: "$trainDetails.destinationStationName",
          departureTime: "$trainDetails.sourceDepartureTime",
          journeyDuration: "$trainDetails.journeyDuration",
        },
        status: 1,
        coaches: {
          $map: {
            input: "$availableCoaches",
            as: "instanceCoach",
            in: {
              coachNumber: "$$instanceCoach.coachNumber",
              coachType: "$$instanceCoach.coachType",
              availableSeats: "$$instanceCoach.seatsAvailable",
              seatDetails: {
                $let: {
                  vars: {
                    matchedCoach: {
                      $arrayElemAt: [
                        {
                          $filter: {
                            input: "$coachDetails",
                            as: "coach",
                            cond: {
                              $eq: [
                                "$$coach.coachNumber",
                                "$$instanceCoach.coachNumber",
                              ],
                            },
                          },
                        },
                        0,
                      ],
                    },
                  },
                  in: {
                    $ifNull: ["$$matchedCoach.seats", []],
                  },
                },
              },
            },
          },
        },
      },
    },
  ]);
  if (!result.length) {
    throw new Error("No train scheduled for this date");
  }

  return result[0];
};
module.exports = {
  getReservationChart,
};
