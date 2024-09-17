const JWT = require("jsonwebtoken");
const User = require("../models/user.js");

// Middleware function to authenticate a user
const Authenticated = async (req, res, next) => {
  const token = req.header("Auth"); // Get the token from the "Auth" header
  if (!token) {
    // If no token is found
    return res.status(401).send({ message: "Access denied, login first." });
  }

  try {
    // Verify the token with the secret key
    const decoded = JWT.verify(token, process.env.JWT_SECRET || "Abhi0419@#");
    
    // Extract the user ID from the decoded token
    const id = decoded.userId;

    // Find the user in the database using the extracted user ID
    const user = await User.findById(id).select("-password"); // Exclude password from user object

    if (!user) {
      // If the user is not found
      return res.status(404).send({ message: "User not found." });
    }

    // Attach the full user object to the request object for use in the next middleware or route
    req.user = user; 

    // Call the next middleware or route handler
    next();
  } catch (error) {
    // Log the error for debugging purposes
    console.error("Error in authentication middleware:", error.message);

    // Send an error response for an invalid token or other errors
    return res.status(400).send({ message: "Invalid token." });
  }
};

module.exports = Authenticated;
