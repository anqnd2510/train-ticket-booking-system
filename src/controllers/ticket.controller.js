const ticketService = require("../services/ticket.service");

//[POST] /tickets/book
module.exports.bookTickets = async (req, res) => {
  try {
    const result = await ticketService.bookTickets(req.account._id, req.body);
    res.status(201).json({
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

//[GET] /tickets/info/:pnrNumber
module.exports.getTicketInfo = async (req, res) => {
  try {
    const ticket = await ticketService.getTicketbyPnrNumber(
      req.params.pnrNumber
    );
    res.status(201).json({
      success: true,
      data: ticket,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

//[GET] /tickets/all/
module.exports.getUserTickets = async (req, res) => {
  try {
    const ticket = await ticketService.getUserTickets(req.account._id);
    res.status(201).json({
      success: true,
      data: ticket,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};
