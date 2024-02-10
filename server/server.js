require("dotenv").config();
const cors = require("cors");
const PORT = process.env.PORT;
const express = require("express");
const connectToDb = require("./database/db");
const cookieParser = require("cookie-parser");
const loginRoute = require("./routes/loginRoute");
const signUpRoute = require("./routes/signUpRoute");
const userRoute = require("./routes/userRoute");
const pathLogger = require("./middlewares/pathLogger");
const unknownRouteHandler = require("./middlewares/unknownRouteHandler");
const {
  isUserAuthenticated,
  secureUserAuth,
} = require("./middlewares/authMiddleware");

const startApp = async () => {
  try {
    await connectToDb("MyApp");

    const app = express();
    app.listen(PORT, () => console.log("Server listening on port:", PORT));

    // Body parser middlewares
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // Cookie parser middleware
    app.use(cookieParser());

    // CORS middleware
    app.use(
      cors({
        origin: "http://localhost:5173",
        credentials: true,
      })
    );

    // Custom middlewares
    app.use(pathLogger);

    // Public routes
    app.use("/api", [signUpRoute, loginRoute]);

    // Protected Routes
    app.use("/authenticate", isUserAuthenticated, [userRoute]);

    app.use("/secureAuth", secureUserAuth);

    // Unknown routes handling middlewares
    app.use("*", unknownRouteHandler);
  } catch (e) {
    console.error("Internal Server Error:", e.message);
    process.exit(1);
  }
};

startApp();
