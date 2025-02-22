const express = require("express");

const router = express.Router();
const baseURL = "/api/v1";

const authRouter = require("./api/authRoutes");
const todoRouter = require("./api/todoRoutes");

router.use(`${baseURL}/todos`, todoRouter);
router.use(`${baseURL}/auth`, authRouter);

module.exports = router;
