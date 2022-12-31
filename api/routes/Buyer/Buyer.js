var express = require("express");
var router = express.Router();

const {signup,login} = require("../../controllers/buyer.controller");

// Clean Routes
// Authentication Routes
router.post("/signup", signup); 
router.post("/login", login); 

router.get("/getBuyerFromAddress",async (req, res) => {


    const address = req.query.address;

    const buyer = await Buyer.findOne({accountAddress: address});

    res.json(buyer);

});


module.exports = router;