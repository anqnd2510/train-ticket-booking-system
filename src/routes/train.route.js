const express = require("express");
const router = express.Router();

const trainController = require("../controllers/train.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const roleMiddleware = require("../middlewares/role.middleware");
/**
 * @swagger
 * /trains/list:
 *   get:
 *     summary: Retrieve all trains
 *     tags: [Trains]
 *     responses:
 *       200:
 *         description: A list of trains
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       trainNumber:
 *                         type: string
 *                         example: "101"
 *                       trainName:
 *                         type: string
 *                         example: "Express Sunrise"
 *                       sourceStationName:
 *                         type: string
 *                         example: "Mumbai"
 *                       destinationStationName:
 *                         type: string
 *                         example: "Delhi"
 *                       distance:
 *                         type: number
 *                         example: 1400
 *                       departureTime:
 *                         type: string
 *                         example: "06:00"
 *                       arrivalTime:
 *                         type: string
 *                         example: "18:00"
 *                       daysOfOperation:
 *                         type: array
 *                         items:
 *                           type: string
 *                         example: ["Monday", "Wednesday", "Friday"]
 *       400:
 *         description: Bad request
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
 *                   example: "Error message"
 */
router.get("/list", trainController.getAllTrains);

/**
 * @swagger
 * /trains/add:
 *   post:
 *     summary: Add a new train
 *     tags: [Trains]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               trainNumber:
 *                 type: string
 *                 example: "101"
 *               trainName:
 *                 type: string
 *                 example: "Express Sunrise"
 *               sourceStationName:
 *                 type: string
 *                 example: "Mumbai"
 *               destinationStationName:
 *                 type: string
 *                 example: "Delhi"
 *               sourceDepartureTime:
 *                 type: string
 *                 example: "06:00"
 *               journeyDuration:
 *                 type: string
 *                 example: "12h 00m"
 *               acTicketFare:
 *                 type: number
 *                 example: 1500
 *               sleeperTicketFare:
 *                 type: number
 *                 example: 800
 *     responses:
 *       201:
 *         description: Train created successfully
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
 *                     trainNumber:
 *                       type: string
 *                       example: "101"
 *                     trainName:
 *                       type: string
 *                       example: "Express Sunrise"
 *                     sourceStationName:
 *                       type: string
 *                       example: "Mumbai"
 *                     destinationStationName:
 *                       type: string
 *                       example: "Delhi"
 *                     sourceDepartureTime:
 *                       type: string
 *                       example: "06:00"
 *                     journeyDuration:
 *                       type: string
 *                       example: "12h 00m"
 *                     acTicketFare:
 *                       type: number
 *                       example: 1500
 *                     sleeperTicketFare:
 *                       type: number
 *                       example: 800
 *       400:
 *         description: Bad request
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
 *                   example: "Train details are required"
 */
router.post(
  "/add",
  authMiddleware.auth,
  roleMiddleware.checkRole(["admin"]),
  trainController.addTrain
);

/**
 * @swagger
 * /trains/info/{id}:
 *   get:
 *     summary: Get train information and available bookings
 *     description: Retrieves detailed information about a train and its future booking instances
 *     tags: [Trains]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Train ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Train information retrieved successfully
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
 *                     trainDetails:
 *                       type: object
 *                       properties:
 *                         trainNumber:
 *                           type: string
 *                           example: "12345"
 *                         trainName:
 *                           type: string
 *                           example: "Express 123"
 *                         sourceStation:
 *                           type: string
 *                           example: "Delhi"
 *                         destinationStation:
 *                           type: string
 *                           example: "Mumbai"
 *                         departureTime:
 *                           type: string
 *                           example: "08:00"
 *                         duration:
 *                           type: string
 *                           example: "16 hours"
 *                         fares:
 *                           type: object
 *                           properties:
 *                             AC:
 *                               type: number
 *                               example: 1500
 *                             Sleeper:
 *                               type: number
 *                               example: 800
 *                     availableBookings:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           instanceId:
 *                             type: string
 *                             example: "65a123b456c789d012345e67"
 *                           journeyDate:
 *                             type: string
 *                             format: date-time
 *                             example: "2025-01-20T00:00:00.000Z"
 *                           status:
 *                             type: string
 *                             enum: ["Scheduled", "Running", "Cancelled", "Completed"]
 *                             example: "Scheduled"
 *                           availableCoaches:
 *                             type: array
 *                             items:
 *                               type: object
 *                               properties:
 *                                 coachNumber:
 *                                   type: string
 *                                   example: "A1"
 *                                 type:
 *                                   type: string
 *                                   enum: ["AC", "Sleeper"]
 *                                   example: "AC"
 *                                 availableSeats:
 *                                   type: number
 *                                   example: 72
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
 *                   example: "Train not found"
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
router.get("/info/:id", trainController.getTrainInfo);

/**
 * @swagger
 * /trains/current/active:
 *   get:
 *     summary: Get all trains in active booking phase
 *     description: Retrieves all trains that have scheduled instances within the next 30 days
 *     tags: [Trains]
 *     responses:
 *       200:
 *         description: List of active trains retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       trainNumber:
 *                         type: string
 *                         example: "12345"
 *                       trainName:
 *                         type: string
 *                         example: "Express 123"
 *                       sourceStationName:
 *                         type: string
 *                         example: "Delhi"
 *                       destinationStationName:
 *                         type: string
 *                         example: "Mumbai"
 *                       sourceDepartureTime:
 *                         type: string
 *                         example: "08:00"
 *                       journeyDuration:
 *                         type: string
 *                         example: "16 hours"
 *                       fares:
 *                         type: object
 *                         properties:
 *                           AC:
 *                             type: number
 *                             example: 1500
 *                           Sleeper:
 *                             type: number
 *                             example: 800
 *                       availableDates:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             date:
 *                               type: string
 *                               format: date-time
 *                               example: "2025-01-20T00:00:00.000Z"
 *                             availableSeats:
 *                               type: number
 *                               example: 152
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
router.get("/current/active", trainController.getActiveTrains);

/**
 * @swagger
 * /trains/cities/all:
 *   get:
 *     summary: Get all cities
 *     description: Returns a list of all unique cities that are either source or destination stations in the train system
 *     tags: [Trains]
 *     responses:
 *       200:
 *         description: List of cities retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       cityName:
 *                         type: string
 *                         example: "Mumbai"
 *                   example:
 *                     - cityName: "Bangalore"
 *                     - cityName: "Chennai"
 *                     - cityName: "Delhi"
 *                     - cityName: "Mumbai"
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
router.get("/cities/all", trainController.getAllCities);

module.exports = router;
