const asyncHandler = require("../utils/asyncHandler");
const AppError = require("../utils/appErrors");
const User = require("../models/userModel");
require("dotenv").config();
const bcrypt = require("bcryptjs");
const createToken = require("../utils/createToken");
const jwt = require("jsonwebtoken");
// Signup
exports.signup = asyncHandler(async (req, res, next) => {
  const { firstName, lastName, userName, password, confirmPassword } = req.body;
  const userExists = await User.findOne({ userName });
  if (userExists) {
    return next(new AppError("User already exists", 400));
  }
  const newUser = await User.create({
    firstName,
    lastName,
    userName,
    password,
    confirmPassword,
  });

  res.status(201).json({
    status: "success",
    data: {
      user: {
        id: newUser._id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        userName: newUser.userName,
        role: newUser.role,
      },
    },
  });
});
// Login
exports.login = asyncHandler(async (req, res, next) => {
  const { userName, password } = req.body;
  const user = await User.findOne({
    userName,
  });
  if (!user) {
    return next(new AppError("username is not correct", 401));
  }
  // Check if password is correct
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return next(new AppError("password is not correct", 401));
  }
  // call Create token
  const token = createToken(res, user);
  console.log(token);
  res.status(200).json({ status: "sucess", data: { token } });
});
// Logout
exports.logout = (req, res) => {
  res.cookie("token", "loggedout", {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: Date.now() + 1,
  });

  res.status(200).json({ status: "success", message: "You have been logged out." });
};
// Protect route : verify token if logged in
exports.protect = asyncHandler(async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.token) {
    token = req.cookies.token;
  }
  // console.log("Token from cookies:", token);

  if (!token) {
    return next(new AppError("You are not logged in! Please log in to get access.", 401));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return next(new AppError("The user belonging to this token no longer exists.", 401));
    }

    if (currentUser.changedPasswordAfter(decoded.iat)) {
      return next(new AppError("User recently changed password! Please log in again.", 401));
    }

    req.user = currentUser;
    next();
  } catch (error) {
    console.error("Token verification error:", error);
    return next(new AppError("Invalid token. Please log in again.", 401));
  }
});
