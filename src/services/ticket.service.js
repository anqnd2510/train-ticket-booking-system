const mongoose = require("mongoose");
const Ticket = require("../models/ticket.model");
const Booking = require("../models/booking.model");
const Train = require("../models/train.model");
const Coach = require("../models/coach.model");

// Book tickets
const bookTickets = async (userId, bookingData) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  // mọi thứ sẽ được rollback nếu có lỗi, và mọi thứ phải được diễn ra trong 1 session
  // thì mới được tính là 1 transaction
  try {
    const train = await Train.findOne({ trainNumber: bookingData.trainNumber });
    if (!train) {
      throw new Error("Train not found");
    }
    const tickets = await Promise.all(
      bookingData.passengers.map(async (passenger) => {
        const coach = await Coach.findOneAndUpdate(
          {
            trainNumber: train.trainNumber,
            coachNumber: passenger.coachNumber,
            seats: {
              $elemMatch: {
                seatNumber: passenger.seatNumber,
                isAvailable: true,
              },
            },
          },
          {
            $set: { "seats.$.isAvailable": false },
          },
          {
            session,
            new: true,
          }
        );
        if (!coach)
          throw new Error(
            `Seat ${passenger.seatNumber} in coach ${passenger.coachNumber} is not available`
          );
        const ticketFare =
          passenger.coachType === "AC"
            ? train.acTicketFare
            : train.sleeperTicketFare;

        return await Ticket.create(
          [
            {
              pnrNumber: new mongoose.Types.ObjectId()
                .toString()
                .slice(0, 10)
                .toUpperCase(),
              trainNumber: train.trainNumber,
              journeyDate: bookingData.journeyDate,
              passengerName: passenger.passengerName,
              passengerGender: passenger.passengerGender,
              coachNumber: passenger.coachNumber,
              coachType: passenger.coachType,
              seatNumber: passenger.seatNumber,
              ticketFare,
              bookingStatus: "Confirmed",
              userId,
            },
          ],
          { session }
        );
      })
    );
    const totalAmount = tickets.reduce((sum, t) => sum + t[0].ticketFare, 0);
    const booking = await Booking.create(
      [
        {
          userId,
          tickets: tickets.map((t) => t[0]._id),
          totalAmount,
          paymentStatus: "Paid",
          status: "Confirmed",
        },
      ],
      { session }
    );
    await session.commitTransaction();
    return { booking: booking[0], tickets: tickets.map((t) => t[0]) };
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};
// chưa cho đặt 1 lúc nhiều vé, chỉ cho đặt 1 vé 1 lần

// Gives back passenger list, and other info
const getTicketbyPnrNumber = async (pnrNumber) => {
  return await Ticket.aggregate([
    // like select in SQL
    {
      $match: { pnrNumber },
    },
    {
      // like join in SQL
      $lookup: {
        from: "trains",
        localField: "trainNumber",
        foreignField: "trainNumber",
        as: "trainDetails",
      },
    },
    {
      $project: {
        pnrNumber: 1,
        passengerName: 1,
        passengerGender: 1,
        coachNumber: 1,
        seatNumber: 1,
        bookingStatus: 1,
        trainDetails: {
          trainName: 1,
          sourceStationName: 1,
          destinationStationName: 1,
          sourceDepartureTime: 1,
          journeyDuration: 1,
        },
      },
    },
  ]);
};

// Gives back tickets for a user
const getUserTickets = async (userId) => {
  return await Booking.aggregate([
    { $match: { userId } },
    {
      $lookup: {
        from: "tickets",
        localField: "tickets",
        foreignField: "_id",
        as: "ticketDetails",
      },
    },
    {
      $lookup: {
        from: "trains",
        localField: "ticketDetails.trainNumber",
        foreignField: "trainNumber",
        as: "trainDetails",
      },
    },
    {
      $sort: { bookingTimestamp: -1 },
    },
  ]);
};

module.exports = {
  bookTickets,
  getTicketbyPnrNumber,
  getUserTickets,
};
