const coachService = require("../services/coach.service");

//[POST] /coaches/add
module.exports.addCoach = async (req, res) => {
  try {
    const { coachNumber, trainNumber, coachType } = req.body;

    // Create new coach
    const newCoach = await coachService.addCoach({
      coachNumber,
      trainNumber,
      coachType,
    });

    // Update train instances
    await coachService.updateTrainInstances(
      trainNumber,
      coachNumber,
      coachType,
      newCoach.seats
    );

    res.status(201).json({
      success: true,
      message: "Coach added successfully",
      data: newCoach,
    });
  } catch (error) {
    console.error("Error adding coach:", error);
    res.status(error.message.includes("not found") ? 404 : 400).json({
      success: false,
      message: error.message,
    });
  }
};

//[GET] /coaches/:trainNumber
module.exports.getCoachesForTrain = async (req, res) => {
  try {
    const trainNumber = req.params.trainNumber;

    // Get all coaches for a train
    const coaches = await coachService.getCoachesForTrain(trainNumber);

    res.status(200).json({
      success: true,
      data: coaches,
    });
  } catch (error) {
    console.error("Error getting coaches for train:", error);
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

//[GET] /coaches/details/:coachNumber
module.exports.getCoachDetails = async (req, res) => {
  try {
    const coachNumber = req.params.coachNumber;

    // Get details of a coach
    const coach = await coachService.getCoachDetails(coachNumber);

    res.status(200).json({
      success: true,
      data: coach,
    });
  } catch (error) {
    console.error("Error getting coach details:", error);
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};
