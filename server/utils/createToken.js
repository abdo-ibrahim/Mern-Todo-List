const jwt = require("jsonwebtoken");
// Create a JWT token with user's id and save it as a cookie
const createToken = (res, user) => {
  // Create a JWT token
  const token = jwt.sign({ id: user.id, name: user.firstName + " " + user.lastName, role: user.role || "user" }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES,
  });

  // Configure the options for the cookie
  const cookieOptions = {
    httpOnly: false, // ← غيّر هذا السطر
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 1000 * 60 * 60 * 24 * 30,
  };

  // Save the token in a cookie
  res.cookie("token", token, cookieOptions);

  return token;
};

module.exports = createToken;
