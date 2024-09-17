const express = require("express");
const { addAddress, getAddress } = require("../controllers/address.js");
const Authenticated = require("../middlewares/auth.js");

const router = express.Router();

// Add user address route with authentication middleware
router.post("/add", Authenticated, addAddress);


// get user address route with authentication middleware
router.get("/get", Authenticated, getAddress);

module.exports = router;
