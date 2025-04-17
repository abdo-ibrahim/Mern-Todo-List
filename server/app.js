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
    // origin: ["http://localhost:5173"],
    origin: ["https://mern-todo-list-xi-five.vercel.app"],
    credentials: true,
  })
);
// Routes
app.use(apiRoutes);
app.get("/", (req, res) => {
  res.status(200).json({ status: "OK", message: "Hello!" });
});
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "OK", message: "Server is up and running!" });
});
app.all("*", (req, _, next) => {
  const err = new Error(`Can't Find ${req.originalUrl}`);
  err.status = "fail";
  err.statusCode = 404;
  err.isOperational = true;
  next(err);
});
app.use(errorHandler);
module.exports = app;
