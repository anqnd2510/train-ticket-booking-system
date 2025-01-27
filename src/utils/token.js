const jwt = require("jsonwebtoken");
require("dotenv").config();

const generateAccessToken = (account) => {
  const payload = {
    _id: account._id,
    email: account.email,
    role: account.role,
  };
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: `${process.env.JWT_ACCESS_EXPIRATION_MINUTES}m`,
  });
};

const generateRefreshToken = (account) => {
  const payload = { id: account._id, email: account.email, role: account.role };
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: `${process.env.JWT_REFRESH_EXPIRATION_DAYS}d`,
  });
};

const generateResetPasswordToken = (account) => {
  const payload = { id: account._id, email: account.email };
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: `${process.env.JWT_RESET_PASSWORD_EXPIRATION_MINUTES}m`,
  });
};

const verifyAccessToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

const verifyRefreshToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

const verifyResetPasswordToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  generateResetPasswordToken,
  verifyAccessToken,
  verifyRefreshToken,
  verifyResetPasswordToken,
};
