const verifyCredentials = require("../services/loginService");

const controller = async (req, res) => {
  // console.log("Inside login controller");

  try {
    const { email, password } = req.body;
    const token = await verifyCredentials(email, password);

    if (req.cookies.jwt) {
      req.cookies.jwt = "";
    }

    if (token) {
      res.cookie("jwt", token, {
        httpOnly: true,
        withCredentials: true,
        expires: new Date(Date.now() + 1 * 60 * 1000), // 1 min
      });
      return res.status(200).json({
        success: true,
        message: "Login Successful",
      });
    } else {
      return res.status(401).json({
        success: false,
        error: "Invalid Credentials",
      });
    }
  } catch (e) {
    console.error(e.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = controller;
