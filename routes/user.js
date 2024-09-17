const express = require("express");
const {register , login , users, userProfile} = require("../controllers/user");
const Authenticated = require("../middlewares/auth.js")

const router = express.Router(); 

// Register user
router.post("/register", register);

// login user        api/user/login
router.post("/login", login);

//all users
router.get("/allusers", users);

//user profile
router.get("/profile", Authenticated , userProfile) ;

module.exports = router; 
