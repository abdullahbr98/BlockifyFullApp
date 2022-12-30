var express = require("express");
var router = express.Router();

const {signup,login} = require("../../controllers/buyer.controller");

// Clean Routes
// Authentication Routes
router.post("/signup", signup); 
router.post("/login", login); 



module.exports = router;