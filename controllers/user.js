const User = require("../models/user.js"); // Import the User model
const bcrypt = require("bcryptjs"); // Import bcrypt for hashing passwords
const JWT = require("jsonwebtoken"); // Import JWT for generating tokens



// Function to register a new user
const register = async (req, res) => {
  const { name, email, password } = req.body; // Extract name, email, and password from request body
  try {
    // Check if a user with the same email already exists
    let user = await User.findOne({ email });
    if (user) 
      return res.json({ message: "User already exists", success: false });

    // Hash the password before storing it in the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user with hashed password
    user = await User.create({ name, email, password: hashedPassword });

    // Send success response with the created user
    res.json({ message: "User registered", user, success: true });
  } catch (error) {
    // Handle any errors
    res.json({ message: error.message, success: false });
  }
};

// Function to log in an existing user
const login = async (req, res) => {
  const { email, password } = req.body; // Extract email and password from request body
  try {
    // Find the user by email
    let user = await User.findOne({ email });
    if (!user) 
      return res.json({ message: "User not found", success: false });

    // Compare the provided password with the hashed password in the database
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) 
      return res.json({ message: "Invalid credentials", success: false });

    // Generate a JWT token for the user
    const token = JWT.sign({ userId: user._id }, "Abhi0419@#", {
      expiresIn: "365d" // Set token expiration period (corrected to 365 days)
    });

    // Send success response with the generated token
    res.json({ message: "Welcome user", token , success: true });
  } catch (error) {
    // Handle any errors
    res.json({ message: error.message, success: false });
  }
};

// Function to get all users
const users = async (req, res) => {
  try {
    // Fetch all users from the database and sort them by creation date in descending order
    let users = await User.find().sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    // Handle any errors
    res.json({ message: error.message, success: false });
  }
};

//user profile
const userProfile = async (req, res) => {
  res.json({user:req.user});
}

// Export the functions to be used in other parts of the application
module.exports = {
  register,
  login,
  users,
  userProfile
};
