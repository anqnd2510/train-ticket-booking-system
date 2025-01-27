const accountService = require("../services/account.service");

//[POST]/accounts/profile
module.exports.getAccountProfile = async (req, res) => {
  try {
    const account = await accountService.getAccountById(req.account._id);
    if (!account) {
      return res.status(404).json({
        success: false,
        error: "User not found",
      });
    }
    res.status(200).json({
      success: true,
      data: account,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};
