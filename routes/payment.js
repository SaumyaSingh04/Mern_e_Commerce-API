const express = require("express");
const router = express.Router();
const { codCheckout, getUserOrders } = require("../controllers/payment.js");

// COD Checkout Route
router.post("/cod-checkout", codCheckout);

//  Get user-specific orders
 router.get("/user-orders/:userId", getUserOrders);

module.exports = router;
