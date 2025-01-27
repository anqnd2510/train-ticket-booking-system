const express = require("express");
const router = express.Router();

const bookingController = require("../controllers/booking.controller");

/**
 * @swagger
 * /bookings/train/{trainId}:
 *   get:
 *     summary: Get all bookings for a specific train by trainId
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: trainId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           example: 60b8f5f9a1e4c8f9d8d8c9e0
 *     responses:
 *       200:
 *         description: Successfully retrieved bookings for the train.
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
 *                       _id:
 *                         type: string
 *                         example: "60b8f5f9a1e4c8f9d8d8c9e0"
 *                       userId:
 *                         type: object
 *                         properties:
 *                           username:
 *                             type: string
 *                             example: "john_doe"
 *                           email:
 *                             type: string
 *                             example: "john@example.com"
 *                           phoneNumbers:
 *                             type: array
 *                             items:
 *                               type: string
 *                               example: "+1234567890"
 *                       trainId:
 *                         type: object
 *                         properties:
 *                           trainName:
 *                             type: string
 *                             example: "Express 500"
 *                           trainNumber:
 *                             type: string
 *                             example: "500"
 *                       bookingStatus:
 *                         type: string
 *                         example: "confirmed"
 *                       bookingDate:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-01-09T12:00:00Z"
 *                       totalAmount:
 *                         type: number
 *                         example: 150
 *       404:
 *         description: No bookings found for the given trainId.
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
 *                   example: "No bookings available for this train"
 *       500:
 *         description: Internal server error.
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
 *                   example: "Internal Server Error"
 */
router.get("/train/:trainId", bookingController.getBookingsByTrainId);

module.exports = router;
