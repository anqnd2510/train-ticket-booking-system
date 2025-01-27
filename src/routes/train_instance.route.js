const express = require("express");
const router = express.Router();

const trainInstanceController = require("../controllers/train_instance.controller");
const chartController = require("../controllers/chart.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const roleMiddleware = require("../middlewares/role.middleware");

/**
 * @swagger
 * /traininstances/addbookinginstance:
 *   post:
 *     summary: Create a new train booking instance
 *     description: Add a new booking instance for a specific train on a specific date with coach details
 *     tags: [Train Instances]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - trainNumber
 *               - journeyDate
 *               - availableCoaches
 *             properties:
 *               trainNumber:
 *                 type: string
 *                 description: Unique identifier of the train
 *                 example: "12345"
 *               journeyDate:
 *                 type: string
 *                 format: date
 *                 description: Date of the journey
 *                 example: "2025-01-20"
 *               availableCoaches:
 *                 type: array
 *                 description: List of coaches available for booking
 *                 items:
 *                   type: object
 *                   required:
 *                     - coachNumber
 *                     - coachType
 *                     - seatsAvailable
 *                   properties:
 *                     coachNumber:
 *                       type: string
 *                       description: Unique number of the coach
 *                       example: "A1"
 *                     coachType:
 *                       type: string
 *                       enum: ["AC", "Sleeper"]
 *                       description: Type of coach (AC or Sleeper)
 *                       example: "AC"
 *                     seatsAvailable:
 *                       type: number
 *                       description: Number of available seats in the coach
 *                       minimum: 0
 *                       example: 72
 *               status:
 *                 type: string
 *                 enum: ["Scheduled", "Running", "Cancelled", "Completed"]
 *                 description: Current status of the train instance
 *                 default: "Scheduled"
 *                 example: "Scheduled"
 *     responses:
 *       201:
 *         description: Train instance created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "65a123b456c789d012345e67"
 *                     trainNumber:
 *                       type: string
 *                       example: "12345"
 *                     journeyDate:
 *                       type: string
 *                       format: date
 *                       example: "2025-01-20T00:00:00.000Z"
 *                     availableCoaches:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           coachNumber:
 *                             type: string
 *                             example: "A1"
 *                           coachType:
 *                             type: string
 *                             example: "AC"
 *                           seatsAvailable:
 *                             type: number
 *                             example: 72
 *                     status:
 *                       type: string
 *                       example: "Scheduled"
 *       400:
 *         description: Bad request or duplicate booking instance
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: "Train instance already exists for this date"
 *       404:
 *         description: Train not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: "Train with given number does not exist"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: "Internal server error"
 */
router.post(
  "/addbookinginstance",
  authMiddleware.auth,
  roleMiddleware.checkRole(["admin"]),
  trainInstanceController.addBookingInstance
);

/**
 * @swagger
 * /traininstances/chart/{train_number}/{date}:
 *   get:
 *     summary: Get reservation chart
 *     description: Retrieve the reservation chart of a specific train on a specific date.
 *     tags:
 *       - Train Instances
 *     parameters:
 *       - name: train_number
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: Train number for which the reservation chart is required.
 *         example: "12345"
 *       - name: date
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *         description: Journey date for the train in YYYY-MM-DD format.
 *         example: "2025-01-27"
 *     responses:
 *       200:
 *         description: Successfully retrieved the reservation chart.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Reservation chart retrieved successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     trainDetails:
 *                       type: object
 *                       properties:
 *                         trainNumber:
 *                           type: string
 *                           example: "12345"
 *                         trainName:
 *                           type: string
 *                           example: "Express Train"
 *                         sourceStation:
 *                           type: string
 *                           example: "Station A"
 *                         destinationStation:
 *                           type: string
 *                           example: "Station B"
 *                         departureTime:
 *                           type: string
 *                           example: "10:00 AM"
 *                         journeyDuration:
 *                           type: string
 *                           example: "6h 30m"
 *                     status:
 *                       type: string
 *                       example: "Scheduled"
 *                     coaches:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           coachNumber:
 *                             type: string
 *                             example: "C1"
 *                           coachType:
 *                             type: string
 *                             example: "AC"
 *                           availableSeats:
 *                             type: integer
 *                             example: 20
 *                           seatDetails:
 *                             type: array
 *                             items:
 *                               type: string
 *                               example: "1A"
 *       400:
 *         description: Failed to retrieve the reservation chart.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: No train scheduled for this date
 */

router.get("/chart/:train_number/:date", chartController.getReservationChart);
module.exports = router;
