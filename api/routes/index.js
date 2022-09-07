var express = require("express");
var router = express.Router();
var axios = require('axios')

var Manufacturer = require("../models/Manufacturer");
var Seller = require("../models/Seller");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.post("/userLogin", async (req, res) => {
  const accountAddress = req.body.address;
  const email = req.body.email;
  const password = req.body.password;
  // Determine User Type
  let result = await Manufacturer.findOne({ accountAddress: accountAddress });
  if (!result) {
      result = await Seller.findOne({
      accountAddress: accountAddress,
    });
    // result ? res.json('User Type is Seller !') : 'Undefined User Type !'
    const data = await axios.post(
      "http://localhost:8000/Seller/login", //TODO customize this to seller and buyer
      { 
          email: email,
          password: password,
          accountAddress: accountAddress 
      });
      res.json(data.data);
  } else {
    // res.json('User Type is Manufacturer !')
    const data = await axios.post(
      "http://localhost:8000/Manufacturer/login", //TODO customize this to seller and buyer
      { 
          email: email,
          password: password,
          accountAddress: accountAddress 
      }
  );

        res.json(data.data);
  }
});


module.exports = router;
