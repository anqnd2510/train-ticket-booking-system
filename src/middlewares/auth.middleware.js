const jwt = require("jsonwebtoken");
const Account = require("../models/account.model");
require("dotenv").config();

module.exports.auth = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized access.",
    });
  }
  const token = authorization.split(" ")[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const account = await Account.findById(decoded._id);
  if (!account) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized access.",
    });
  }
  req.account = account;
  next();
};
