const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const apiRoutes = require("./routes/apiRoutes");
const errorHandler = require("./utils/errorHandler");
const app = express();
app.use(cookieParser(process.env.JWT_SECRET_KEY));
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
// Routes
app.use(apiRoutes);
app.all("*", (req, _, next) => {
  const err = new Error(`Can't Find ${req.originalUrl}`);
  err.status = "fail";
  err.statusCode = 404;
  err.isOperational = true;
  next(err);
});
app.use(errorHandler);
module.exports = app;
