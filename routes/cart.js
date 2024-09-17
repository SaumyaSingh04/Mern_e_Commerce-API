const express = require("express");
const {
  addToCart,
  userCart,
  removeProductFromCart,
  clearCart,
  decreaseProductQty, // Fixed the typo here
} = require("../controllers/cart.js");
const Authenticated = require("../middlewares/auth.js");

const router = express.Router();

// Add product to cart
router.post("/add", Authenticated, addToCart);

// Get cart
router.get("/user", Authenticated, userCart);

// Remove product from cart
router.delete("/remove/:productId", Authenticated, removeProductFromCart); 

// Clear cart
router.delete("/clear", Authenticated, clearCart);

// Decrease quantity of product in cart
router.post("/--qty", Authenticated, decreaseProductQty); // Updated path and fixed the typo

module.exports = router;
