const jwt = require("jsonwebtoken");
require("dotenv").config();

// Secret key for signing JWTs (replace with environment variable in production)
const SECRET_KEY = process.env.JWT_SECRET_CODE || "fod";

// Function to sign a JWT token
const signToken = (user) => {
  return jwt.sign({ id: user.id, role: user.role }, SECRET_KEY, {
    expiresIn: "1h",
  });
};

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    return res
      .status(401)
      .json({ message: "Unauthorized access, token missing" });
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Invalid or expired token" });
    }
    req.user = decoded; // Attach decoded payload to request object
    next();
  });
};

module.exports = {
  signToken,
  verifyToken,
};
