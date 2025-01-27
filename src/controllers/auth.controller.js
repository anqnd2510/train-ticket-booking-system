const authService = require("../services/auth.service");

//[POST]/auth/login
module.exports.loginAccount = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { accessToken } = await authService.loginUserWithEmailAndPassword(
      email,
      password
    );

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
    });

    res.status(200).json({
      success: true,
      accessToken,
      message: "Login successful",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

//[POST]/auth/register
module.exports.registerAccount = async (req, res) => {
  try {
    const userData = req.body;
    const { accessToken } = await authService.registerAccount(userData);

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
    });

    res.status(201).json({
      success: true,
      accessToken,
      message: "Account created successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
