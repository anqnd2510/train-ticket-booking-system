# Train Ticket Booking System

## Description
The "Train Ticket Booking" project is an online system that allows users to book train tickets, search for available trains, view ticket information, and manage bookings. The system provides features such as ticket payments, ticket cancellations, and viewing booking history. It also supports admin features to add trains, coaches, and manage bookings.

## Features
- **Sign up and Login**: Users can create an account and log in to access ticket booking features.
- **Train Search**: Users can search for available trains by date, time, and route.
- **Book Tickets**: Users can book tickets for a train and select their seats.
- **Cancel Tickets**: Users can cancel previously booked tickets.
- **Ticket Information**: Users can view the details of their booked tickets and their status.
- **Train and Coach Management**: Admins can add new trains, coaches, and manage bookings.

## API Endpoints
- **POST /user/profile**: Retrieve the logged-in user's profile information.
- **GET /trains/list**: Get a list of available trains.
- **GET /trains/info/:id**: Get detailed information about a train and its bookings.
- **GET /trains/current/active**: Get trains that are currently in the booking phase.
- **GET /cities/all**: Get a list of all cities that can be used as source or destination.
- **POST /tickets/book**: Book a ticket for the user (requires login).
- **POST /tickets/cancel**: Cancel a booked ticket (requires login).
- **GET /tickets/info/:pnr**: Get information about a passenger's ticket (requires login).
- **GET /tickets/all/**: Get a list of all tickets for the user (requires login).
- **GET /chart/:train_number/:date**: View the booking chart of a train.
- **GET /coaches/list/:trainNumber**: Get a list of coaches for a specific train.
- **GET /coaches/:id**: Get detailed information about a coach.
- **POST /admin/coaches/add**: Add a new coach (requires admin privileges).
- **POST /admin/addbookinginstance**: Add a new train to the booking system (requires admin privileges).
- **POST /admin/trains/add**: Add a new train to the system (requires admin privileges).

## Installation

1. Clone the repository to your local machine:
   ```bash
   git clone https://github.com/<username>/train-ticket-booking.git
2. Install the dependencies:
cd train-ticket-booking
npm install
3. Configure the database in the .env file:
DATABASE_URL=mongodb://localhost:27017/train-ticket-booking
4. Run the application:
npm start
