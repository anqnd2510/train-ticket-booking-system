const express = require("express");
const router = express.Router();

const ticketController = require("../controllers/ticket.controller");
const authMiddleware = require("../middlewares/auth.middleware");

/**
 * @swagger
 * /tickets/book:
 *   post:
 *     summary: Book a ticket for a train
 *     tags: [Tickets]
 *     security:
 *       - bearerAuth: []
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
 *               journeyDate:
 *                 type: string
 *                 format: date
 *                 example: "2025-02-01"
 *               passengers:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     passengerName:
 *                       type: string
 *                       example: "John Doe"
 *                     passengerGender:
 *                       type: string
 *                       enum: ["Male", "Female", "Other"]
 *                       example: "Male"
 *                     coachNumber:
 *                       type: string
 *                       example: "A1"
 *                     coachType:
 *                       type: string
 *                       enum: ["AC", "Sleeper"]
 *                       example: "AC"
 *                     seatNumber:
 *                       type: number
 *                       example: 12
 *     responses:
 *       201:
 *         description: Ticket booked successfully
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
 *                     booking:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                           example: "63b93a2a9e1d4e7e8a5f765a"
 *                         totalAmount:
 *                           type: number
 *                           example: 1500
 *                         paymentStatus:
 *                           type: string
 *                           example: "Paid"
 *                     tickets:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           pnrNumber:
 *                             type: string
 *                             example: "X123456789"
 *                           passengerName:
 *                             type: string
 *                             example: "John Doe"
 *                           coachNumber:
 *                             type: string
 *                             example: "A1"
 *                           seatNumber:
 *                             type: number
 *                             example: 12
 *       400:
 *         description: Booking failed
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
 *                   example: "Train not found"
 */
router.post("/book", authMiddleware.auth, ticketController.bookTickets);

/**
 * @swagger
 * /tickets/info/{pnrNumber}:
 *   get:
 *     summary: Retrieve ticket information by PNR number
 *     tags: [Tickets]
 *     parameters:
 *       - in: path
 *         name: pnrNumber
 *         required: true
 *         schema:
 *           type: string
 *         description: The PNR number of the ticket
 *     responses:
 *       200:
 *         description: Ticket details retrieved successfully
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
 *                     pnrNumber:
 *                       type: string
 *                       example: "X123456789"
 *                     passengerName:
 *                       type: string
 *                       example: "John Doe"
 *                     passengerGender:
 *                       type: string
 *                       example: "Male"
 *                     coachNumber:
 *                       type: string
 *                       example: "A1"
 *                     seatNumber:
 *                       type: number
 *                       example: 12
 *                     trainDetails:
 *                       type: object
 *                       properties:
 *                         trainName:
 *                           type: string
 *                           example: "Express Sunrise"
 *                         sourceStationName:
 *                           type: string
 *                           example: "Mumbai"
 *                         destinationStationName:
 *                           type: string
 *                           example: "Delhi"
 *                         sourceDepartureTime:
 *                           type: string
 *                           example: "06:00"
 *                         journeyDuration:
 *                           type: number
 *                           example: 12
 *       404:
 *         description: Ticket not found
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
 *                   example: "Ticket not found"
 */
router.get(
  "/info/:pnrNumber",
  authMiddleware.auth,
  ticketController.getTicketInfo
);

/**
 * @swagger
 * /tickets/all:
 *   get:
 *     summary: Retrieve all tickets for a user
 *     tags: [Tickets]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Tickets retrieved successfully
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
 *                       id:
 *                         type: string
 *                         example: "63b93a2a9e1d4e7e8a5f765a"
 *                       totalAmount:
 *                         type: number
 *                         example: 1500
 *                       paymentStatus:
 *                         type: string
 *                         example: "Paid"
 *                       tickets:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             pnrNumber:
 *                               type: string
 *                               example: "X123456789"
 *                             trainNumber:
 *                               type: string
 *                               example: "101"
 *                             journeyDate:
 *                               type: string
 *                               format: date
 *                               example: "2025-02-01"
 *                             passengerName:
 *                               type: string
 *                               example: "John Doe"
 *                             coachNumber:
 *                               type: string
 *                               example: "A1"
 *                             seatNumber:
 *                               type: number
 *                               example: 12
 *                             ticketFare:
 *                               type: number
 *                               example: 500
 *       404:
 *         description: No tickets found
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
 *                   example: "No tickets found"
 */
router.get("/all", authMiddleware.auth, ticketController.getUserTickets);

module.exports = router;
