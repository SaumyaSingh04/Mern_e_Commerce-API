const Address = require("../models/address.js"); // Import the Address model

// Function to add a new address
const addAddress = async (req, res) => {
  try {
    // Extract address details from the request body
    const { fullName, address, city, state, country, phoneNumber, zipCode } = req.body;

    // Extract the user ID from the authenticated user (attached by middleware)
    const userId = req.user; // `req.user` is already the user ID set in the middleware

    // Create a new address document in the database
    const userAddress = await Address.create({
      userid: userId, // Ensure 'userid' matches the schema field name
      fullName,
      address,
      city,
      state,
      country,
      phoneNumber,
      zipCode,
    });

    // Send a response with a success message and the created address
    res.json({ message: "User address added", userAddress });
  } catch (error) {
    // Error handling to catch any errors and send a response
    res.status(500).json({ message: "An error occurred while adding the address", error: error.message });
  }
};

//get address

const getAddress = async (req, res) => {
  try {
    // Find addresses associated with the authenticated user ID and sort them by creation date (newest first)
    const address = await Address.find({ userid: req.user }).sort({ createdAt: -1 });

    if (!address.length) {
      // If no addresses are found, return a 404 response
      return res.status(404).json({ message: "No address found for the user." });
    }

    // Send a response with the most recent address
    res.json({ message: "Address retrieved", userAddress: address[0] });
  } catch (error) {
    // Error handling to catch any errors and send a response
    res.status(500).json({ message: "An error occurred while retrieving the address", error: error.message });
  }
};

// Export the addAddress function
module.exports = {
  addAddress,
  getAddress,

};
