require("dotenv").config();
const jwt = require("jsonwebtoken");

const isUserAuthenticated = (req, res, next) => {
  console.log("Inside Auth Middleware");
  const token = req.cookies.accJwt;

  if (!token) {
    return res
      .status(401)
      .json({ status: false, error: "Invalid Credentials" });
  }

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET_KEY);
    next();
  } catch (err) {
    console.log("Invalid token:", err.message);
    return res
      .status(401)
      .json({ status: false, error: "Invalid Credentials" });
  }
};

const secureUserAuth = (req, res, next) => {
  const prevToken = req.cookies.accJwt;

  if (!prevToken) {
    return res
      .status(401)
      .json({ status: false, error: "Invalid Credentials" });
  }

  try {
    jwt.verify(prevToken, process.env.JWT_REFRESH_KEY);
    res.clearCookie("accJwt");

    const refreshToken = jwt.sign({}, process.env.JWT_REFRESH_KEY, {
      expiresIn: "30s",
    });

    // Set the new refresh token in the response cookie
    res.cookie("refJwt", refreshToken, { httpOnly: true, secure: true });
    next();
  } catch (err) {
    console.log("Invalid token:", err.message);
    return res.status(403).json({ status: false, error: "Unauthorized" });
  }
};

module.exports = { isUserAuthenticated, secureUserAuth };
