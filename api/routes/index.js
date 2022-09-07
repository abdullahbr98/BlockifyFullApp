var express = require("express");
var router = express.Router();
var axios = require('axios')

var Manufacturer = require("../../models/Manufacturer");
var Seller = require("../../models/Seller");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.post("/userLogin", async (req, res) => {
  const accountAddress = req.body.address;
  // Determine User Type
  const result = await Manufacturer.findOne({ accountAddress: accountAddress });
  if (!result) {
      result = await Seller.findOne({
      accountAddress: accountAddress,
    });
    result ? res.json('User Type is Seller !') : 'Undefined User Type !'
  } else {
    res.json('User Type is Manufacturer !')
  }
});


module.exports = router;
