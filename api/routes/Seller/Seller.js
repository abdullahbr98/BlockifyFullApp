// File Description : Contains Dapp Routes for Manufacturer User Type
// Sign Up
// Login
// Purchase Request

var express = require("express");
var ethers = require("ethers");
var router = express.Router();
var productRequests = require("../../models/productRequests");
var Seller = require("../../models/Seller");


router.post('/signup',async(req,res)=>{
    const email = req.body.email
    const password = req.body.password
    const sellerAddress = req.body.sellerAddress

    const seller = new Seller({email:email,password:password,accountAddress:sellerAddress});
    await seller.save()

    res.json('Sign Up Successful !')

})


router.post('/productRequest',async(req,res)=>{
    const sellerAddress = req.body.sellerAddress;
    const products = req.body.products;

    const productRequest = new productRequests({sellerAddress:sellerAddress,products:products});
    await productRequest.save();

    res.json('Request Sent !')

})

module.exports = router