// Generate seats for a coach based on the coach type
const generateSeatsForCoach = (coachType) => {
  const seatConfig = {
    AC: 10,
    Sleeper: 10,
  };

  const totalSeats = seatConfig[coachType];
  const seats = [];

  for (let i = 1; i <= totalSeats; i++) {
    seats.push({
      seatNumber: i,
      isAvailable: true,
    });
  }

  return seats;
};

module.exports = {
  generateSeatsForCoach,
};
