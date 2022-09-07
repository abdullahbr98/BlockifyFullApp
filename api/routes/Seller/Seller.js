// File Description : Contains Dapp Routes for Manufacturer User Type
// Sign Up
// Login
// Purchase Request

var express = require("express");
var ethers = require("ethers");
var router = express.Router();
var productRequests = require("../../models/productRequests");
var Seller = require("../../models/Seller");

router.post("/signup", async (req, res) => {
    const userType = req.body.userType;
    const phone = req.body.phone;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const sellerAddress = req.body.sellerAddress;

    const seller = new Seller({
        userType: userType,
        phoneNumber: phone,
        firstName: firstName,
        lastName: lastName,
        username: username,
        email: email,
        password: password, //TODO bycrypt this password
        accountAddress: sellerAddress,
    });
    await seller.save();

    res.json("Sign Up Successful !");
});

router.post("/productRequest", async (req, res) => {
    const sellerAddress = req.body.sellerAddress;
    const products = req.body.products;

    const productRequest = new productRequests({
        sellerAddress: sellerAddress,
        products: products,
    });
    await productRequest.save();

    res.json("Request Sent !");
});

router.get("/productRequest", async (req, res) => {
    const ProductRequests = await productRequests.find({});
    console.log(ProductRequests);
    res.json(ProductRequests);
});

module.exports = router;
