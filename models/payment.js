const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Assuming you have a User model
    required: true
  },
  cartItems: {
    type: Array,
    required: true,
  },
  userShipping: {
    type: Object,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  payStatus: {
    type: String,
    required: true,
  },
  paymentMethod: {
    type: String,
    required: true,
  },
  orderDate: {
    type: Date,
    default: Date.now,
  },
}, { strict: false });

module.exports = mongoose.model("Payment", paymentSchema);
