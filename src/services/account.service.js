const Account = require("../models/account.model");

// Get account by id
const getAccountById = async (accountId) => {
  return Account.findById(accountId);
};

// Get account by username
const getAccountByUsername = async (username) => {
  const account = await Account.findOne({ username });
  return account;
};

// Get user by email
const getAccountByEmail = async (email) => {
  return Account.findOne({
    email,
  });
};

// Create new account
const createAccount = async (accountBody) => {
  return Account.create(accountBody);
};

module.exports = {
  getAccountById,
  getAccountByUsername,
  getAccountByEmail,
  createAccount,
};
