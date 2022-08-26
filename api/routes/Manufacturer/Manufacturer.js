// File Description : Contains Dapp Routes for Manufacturer User Type
// Sign Up
// Login
// Purchase Request

var express = require("express");
var ethers = require("ethers");
var router = express.Router();
var Manufacturer = require("../../models/Manufacturer");
var PurchaseRequest = require("../../models/purchaseRequest");

// Importing ABI and BYTE CODE for Contract Deployment
const {
    SELLER_AUTHENTICATION_ABI,
    SELLER_AUTHENTICATION_BYTE_CODE,
    PRODUCTS_ABI,
    PRODUCTS_BYTE_CODE,
} = require("../../utils/Constants/ManufacturerSMConstants");

// Manufacturer Sign Up Route
router.post("/signup", async (req, res) => {
    const userType = req.body.userType;
    const phoneNumber = req.body.phoneNumber;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
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
    await manufacturer.save();

    res.json("Sign up Successfull !");
});

router.post("/login", async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const accountAddress = req.body.accountAddress;

    const result = await Manufacturer.findOne({
        email: email,
        password: password,
        accountAddress: accountAddress,
    });
    let response = "";
    result !== null
        ? (response = "Login Successful !")
        : (response = "Invalid Credentials");

    res.json(response);
});

// Purchase Request Route
router.post("/purchaseRequest", async (req, res) => {
    const accountAddress = req.body.accountAddress;
    const sellerAddress = req.body.sellerAddress;
    const purchaseRequest = new PurchaseRequest({
        manufacturer: accountAddress,
        seller: sellerAddress,
        status: false,
    });
    await purchaseRequest.save();

    res.json("Request Sent !");
});

module.exports = router;
