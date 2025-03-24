const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

// Load environment variables from .env file
dotenv.config();

const jwt_secret = process.env.JWT_SECRET_KEY;

const fetchuser = (req, res, next) => {
  // Get the user from the JWT token and add ID to req object

  // Get token from header 'auth-token'
  const token = req.header("auth-token");

  // If token is missing
  if (!token) {
    return res
      .status(401)
      .json({ error: "Please authenticate using a valid token" });
  }

  try {
    // Verify the received token
    const data = jwt.verify(token, jwt_secret);
    // Add user ID to request object
    req.user = data.user;
    // Call next middleware
    next();
  } catch (error) {
    res.status(401).json({ error: "Please authenticate using a valid token" });
  }
};

module.exports = fetchuser;
