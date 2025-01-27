const express = require("express");
const router = express.Router();
const coachController = require("../controllers/coach.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const roleMiddleware = require("../middlewares/role.middleware");

/**
 * @swagger
 * /coaches/add:
 *   post:
 *     summary: Add a new coach
 *     tags: [Coaches]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               coachNumber:
 *                 type: string
 *                 example: "AC01"
 *               trainNumber:
 *                 type: string
 *                 example: "12345"
 *               coachType:
 *                 type: string
 *                 enum: ["AC", "Sleeper"]
 *                 example: "AC"
 *     responses:
 *       201:
 *         description: Coach added successfully
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
 *                   example: "Coach added successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "64e56f7c0a1d6c8e2c4b6b11"
 *                     coachNumber:
 *                       type: string
 *                       example: "AC01"
 *                     trainNumber:
 *                       type: string
 *                       example: "12345"
 *                     coachType:
 *                       type: string
 *                       example: "AC"
 *                     seats:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           seatNumber:
 *                             type: number
 *                             example: 1
 *                           isAvailable:
 *                             type: boolean
 *                             example: true
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
 *                 message:
 *                   type: string
 *                   example: "Invalid data: coachNumber, trainNumber, or coachType is missing or invalid."
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
 *                 message:
 *                   type: string
 *                   example: "Train with the specified trainNumber not found."
 */
router.post(
  "/add",
  authMiddleware.auth,
  roleMiddleware.checkRole(["admin"]),
  coachController.addCoach
);

/**
 * @swagger
 * /coaches/list/{trainNumber}:
 *   get:
 *     summary: Get a list of all coaches for a specific train
 *     tags: [Coaches]
 *     parameters:
 *       - in: path
 *         name: trainNumber
 *         required: true
 *         schema:
 *           type: string
 *         description: The train number to retrieve coaches for
 *     responses:
 *       200:
 *         description: Successfully retrieved the list of coaches for the specified train
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
 *                       coachNumber:
 *                         type: string
 *                         example: "AC01"
 *                       coachType:
 *                         type: string
 *                         example: "AC"
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
 *                 message:
 *                   type: string
 *                   example: "Failed to fetch coaches for the specified train."
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
 *                 message:
 *                   type: string
 *                   example: "Train not found."
 */
router.get("/list/:trainNumber", coachController.getCoachesForTrain);

/**
 * @swagger
 * /coaches/details/{coachNumber}:
 *   get:
 *     summary: Get details of a specific coach
 *     tags: [Coaches]
 *     parameters:
 *       - in: path
 *         name: coachNumber
 *         required: true
 *         schema:
 *           type: string
 *         description: The coach number to retrieve details for
 *     responses:
 *       200:
 *         description: Successfully retrieved the details of the specified coach
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
 *                       example: "64e56f7c0a1d6c8e2c4b6b11"
 *                     coachNumber:
 *                       type: string
 *                       example: "AC01"
 *                     trainNumber:
 *                       type: string
 *                       example: "12345"
 *                     coachType:
 *                       type: string
 *                       example: "AC"
 *                     seats:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           seatNumber:
 *                             type: number
 *                             example: 1
 *                           isAvailable:
 *                             type: boolean
 *                             example: true
 *       404:
 *         description: Coach not found
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
 *                   example: "Coach not found."
 */
router.get("/details/:coachNumber", coachController.getCoachDetails);

module.exports = router;
