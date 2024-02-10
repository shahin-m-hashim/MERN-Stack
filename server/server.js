require("dotenv").config();
const cors = require("cors");
const PORT = process.env.PORT;
const express = require("express");
const connectToDb = require("./database/db");
const cookieParser = require("cookie-parser");
const loginRoute = require("./routes/loginRoute");
const signUpRoute = require("./routes/signUpRoute");
const pathLogger = require("./middlewares/pathLogger");
const errorHandler = require("./middlewares/errorHandler");
const unknownRouteHandler = require("./middlewares/unknownRouteHandler");

const startApp = async () => {
  try {
    await connectToDb("MyApp");
    const app = express();

    app.listen(PORT, () => console.log("Server listening on port:", PORT));

    // middlewares
    app.use(
      cors({
        origin: "http://localhost:5173",
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
      })
    );

    app.use(pathLogger);
    app.use(express.json());
    app.use(cookieParser());
    app.use(express.urlencoded({ extended: true }));

    app.use("/api", [signUpRoute, loginRoute]);

    app.use(unknownRouteHandler);
    app.use(errorHandler);
  } catch (e) {
    console.error("Error starting the server:", e.message);
    process.exit(1);
  }
};

startApp();
