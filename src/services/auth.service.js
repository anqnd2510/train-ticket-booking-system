const bcrypt = require("bcryptjs");
const tokenUtil = require("../utils/token");
const accountService = require("./account.service");

// Function to login a user with email and password
const loginUserWithEmailAndPassword = async (email, password) => {
  const account = await accountService.getAccountByEmail(email);
  console.log(account);
  if (!account) {
    throw new Error("Invalid email or password.");
  }
  //   const validPassword = await bcrypt.compare(password, account.password);
  //   if (!validPassword) {
  //     throw new Error("Invalid email or password.");
  //   }
  const accessToken = tokenUtil.generateAccessToken(account);

  return {
    accessToken,
    account,
  };
};

// Fuction to register a new user
const registerAccount = async (userData) => {
  const account = await accountService.createAccount(userData);
  const accessToken = tokenUtil.generateAccessToken(account);
  const emailExists = await accountService.getAccountByEmail(userData.email);
  if (emailExists) {
    throw new Error("Email is already registered.");
  }

  const usernameExists = await accountService.getAccountByUsername(
    userData.username
  );
  if (usernameExists) {
    throw new Error("Username is already taken.");
  }
  return {
    accessToken,
    account,
  };
};
module.exports = {
  loginUserWithEmailAndPassword,
  registerAccount,
};
