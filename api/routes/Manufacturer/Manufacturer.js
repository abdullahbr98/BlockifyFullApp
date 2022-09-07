// File Description : Contains Dapp Routes for Manufacturer User Type
// Sign Up
// Login
// Purchase Request
var express = require("express");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
var ethers = require("ethers");
var router = express.Router();
var Manufacturer = require("../../models/Manufacturer");
var Seller = require("../../models/Seller");
var PurchaseRequest = require("../../models/purchaseRequest");
var ProductRequest = require("../../models/productRequests");
const auth = require("../../middleware/auth");

// Importing ABI and BYTE CODE for Contract Deployment
const {
    SELLER_AUTHENTICATION_ABI,
    SELLER_AUTHENTICATION_BYTE_CODE,
    PRODUCTS_ABI,
    PRODUCTS_BYTE_CODE,
} = require("../../utils/Constants/ManufacturerSMConstants");

// Manufacturer Sign Up Route
router.post("/signup", async (req, res) => {
    //generating salt
    const salt = await bcrypt.genSalt(10);
    const userType = req.body.userType;
    const phoneNumber = req.body.phoneNumber;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const username = req.body.username;
    const email = req.body.email;
    const password = await bcrypt.hash(req.body.password, salt);
    const accountAddress = req.body.accountAddress;

    const signer = new ethers.providers.JsonRpcProvider(
        "http://localhost:7545"
    ).getSigner(accountAddress);

    const SellerAuthenticationContract = new ethers.ContractFactory(
        SELLER_AUTHENTICATION_ABI,
        SELLER_AUTHENTICATION_BYTE_CODE,
        signer
    );

    // Deploying Authenticate Seller Contract for the Manufacturer
    console.log(`Deploying from account : ${signer._address}`);
    const authContract = await SellerAuthenticationContract.deploy();
    await authContract.deployed();

    console.log(
        `Seller Authentication Contract Deployed at Address : ${authContract.address}`
    );

    const ProductsContract = new ethers.ContractFactory(
        PRODUCTS_ABI,
        PRODUCTS_BYTE_CODE,
        signer
    );

    // Deploying Products Contract for the Manufacturer
    console.log(`Deploying from account : ${signer._address}`);
    const productsContract = await ProductsContract.deploy();
    await productsContract.deployed();

    console.log(
        `Products Contract Deployed at Address : ${productsContract.address}`
    );

    const manufacturer = new Manufacturer({
        userType: userType,
        phoneNumber: phoneNumber,
        firstName: firstName,
        lastName: lastName,
        username: username,
        email: email,
        password: password,
        accountAddress: accountAddress,
        authContractAddress: authContract.address,
        productsContractAddress: productsContract.address,
    });
    // Create token
    const token = jwt.sign(
        { user_id: manufacturer._id, email },
        process.env.TOKEN_KEY,
        {
            expiresIn: "2h",
        }
    );
    // save user token
    manufacturer.token = token;
    await manufacturer.save();

    res.json("Sign up Successfull !");
});

router.post("/login", async (req, res) => {
    const email = req.body.email;
    const accountAddress = req.body.accountAddress;

    const result = await Manufacturer.findOne({
        email: email,
        accountAddress: accountAddress,
    });
    const validPassword = await bcrypt.compare(
        req.body.password,
        result.password
    );

    //jwt
    const token = jwt.sign(
        { user_id: result._id, email },
        process.env.TOKEN_KEY,
        {
            expiresIn: "2h",
        }
    );
    // save user token

    result.token = token;
    //jwt
    let response = "";
    validPassword !== null
        ? (response = "Login Successful !")
        : (response = "Invalid Credentials");

    res.json(result);
});

// Purchase Request Route

router.post("/purchaseRequest", async (req, res) => {
    const sellerAddress = req.body.sellerAddress;
    const manufacturerAddress = req.body.manufacturerAddress;
    const products = req.body.products;

    // Create a Purchase Request and Save in Database
    const purchaseRequest_ = new PurchaseRequest({
        manufacturer: manufacturerAddress,
        seller: sellerAddress,
        status: false,
        products: products,
    });
    await purchaseRequest_.save();

    // Delete the Product Request from DataBase
    // Syntax Confirm !
    await ProductRequest.deleteOne({ sellerAddress: sellerAddress });

    res.json("Request Sent Successfully !");
});

router.post("/deletePurchaseRequest", async (req, res) => {
    const sellerAddress = req.body.sellerAddress;
    const manufacturerAddress = req.body.manufacturerAddress;
    const products = req.body.products;

    // Delete the Product Request from DataBase
    // Syntax Confirm !
    await ProductRequest.deleteOne({ sellerAddress: sellerAddress });

    res.json("Request Deleted Successfully !");
});

//TO DO create a GET request of fetching all authenticated sellers in the database

//TO DO Products in Inventory GET request

//new route
//JWT EXPERIMENTATION
router.post("/dashboard", auth, (req, res) => {
    res.status(200).send("Welcome 🙌 ");
});

module.exports = router;
