var express = require("express");
var router = express.Router();
var axios = require('axios')
const stripe = require('stripe')(process.env.STRIPE_KEY);
var Manufacturer = require("../models/Manufacturer");
var Seller = require("../models/Seller");

const YOUR_DOMAIN = 'http://localhost:8000';

router.post('/create-checkout-session', async (req, res) => {
  const products = req.body.products;
  console.log(products);
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price: process.env.PRICE_ID,
        quantity: products,
      },
    ],
    mode: 'payment',
    success_url: `${YOUR_DOMAIN}?success=true`,
    cancel_url: `${YOUR_DOMAIN}?canceled=true`,
  });

  axios.post('http://localhost:8000/ManufacturerSM/sendProducts',{
    products:products,
    price:100
  })
  // res.redirect(303,"http://localhost:8000/ManufacturerSM/sendProducts");
});


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
