// File Description : Contains Dapp Routes for Manufacturer User Type
// Sign Up
// Login
// Purchase Request
var path = require("path");
var multer = require("multer");
var express = require("express");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
var ethers = require("ethers");
var router = express.Router();
var productRequests = require("../../models/productRequests");
var purchaseRequest = require("../../models/purchaseRequest");
var Seller = require("../../models/Seller");
var authenticationRequest = require("../../models/authenticationRequest");
const auth = require("../../middleware/auth");

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

router.get("/purchaseRequest", async (req, res) => {
    const seller = req.query.sellerAddress;
    const PurchaseRequests = await purchaseRequest.find({seller:seller});
    console.log(PurchaseRequests);
    res.json(PurchaseRequests);
});

router.get("/getIsAuthenticated", async (req, res) => {
    const SellerAddress = req.query.sellerAddress;
    console.log(SellerAddress);
    const seller = await Seller.findOne({ accountAddress: SellerAddress });
    console.log(seller);
    const isAuthenticated = seller.authenticated;
    console.log(isAuthenticated);
    res.json(isAuthenticated);
});

router.post("/login", async (req, res) => {
    const email = req.body.email;
    const accountAddress = req.body.accountAddress;

    const result = await Seller.findOne({
        email: email,
        accountAddress: accountAddress,
    });
    console.log(result);
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

router.post("/requestAuthentication", async (req, res) => {
    const SellerAddress = req.body.sellerAddress;
    var authRequest = new authenticationRequest({
        sellerAddress: SellerAddress,
    });
    await authRequest.save();
    res.json("Successful");
});

router.get("/shopInformation", async(req,res)=>{
    const sellerAddress = req.query.sellerAddress;
    console.log(sellerAddress);
    var sellerInfo = await Seller.findOne({accountAddress:sellerAddress});
    res.json(sellerInfo);
});

router.post("/updateShopInformation", async(req,res)=>{
    const sellerAddress = req.body.sellerAddress;
    var sellerInfo = await Seller.findOne({accountAddress:sellerAddress});
    await sellerInfo.update({
        shopName:req.body.shopName,
        cordinates: req.body.cordinates,
        shopAddress: req.body.shopAddress,
    });
    res.json("completed Updation");
})

const storage = multer.diskStorage({
    destination: (req,file,cb) =>{
        cb(null,"./files")
    },
    filename: (req, file,cb)=>{
        console.log(file);
        cb(null,Date.now()+path.extname(file.originalname));
    },
})

const upload = multer({ dest: "./files/" })

router.post("/upload",upload.single('file'),(req,res)=>{
    res.send("success");
})



module.exports = router;
