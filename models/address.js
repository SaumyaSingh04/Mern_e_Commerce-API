const mongoose = require("mongoose");

// Define the schema for the address model
const addressSchema = new mongoose.Schema({
  userid: {
    type: mongoose.Schema.Types.ObjectId, // User ID reference to the User model
    ref: "User",
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  zipCode: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create and export the Address model
const Address = mongoose.model("Address", addressSchema);
module.exports = Address;
