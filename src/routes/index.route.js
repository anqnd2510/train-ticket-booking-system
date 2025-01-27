const accountRoutes = require("./account.route");
const trainRoutes = require("./train.route");
const bookingRoutes = require("./booking.route");
const trainInstanceRoutes = require("./train_instance.route");
const coachRoutes = require("./coach.route");
const ticketRoutes = require("./ticket.route");
const authRoutes = require("./auth.route");

module.exports = (app) => {
  app.use("/accounts", accountRoutes);

  app.use("/trains", trainRoutes);

  app.use("/bookings", bookingRoutes);

  app.use("/traininstances", trainInstanceRoutes);

  app.use("/coaches", coachRoutes);

  app.use("/tickets", ticketRoutes);

  app.use("/auths", authRoutes);
};
