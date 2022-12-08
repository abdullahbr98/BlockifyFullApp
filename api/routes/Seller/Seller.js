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
var Product = require('../../models/Product');
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
  const productModelNo = req.body.productModelNo;

  const productRequest = new productRequests({
    sellerAddress: sellerAddress,
    products: products,
    productModelNo: productModelNo,
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
  const PurchaseRequests = await purchaseRequest.find({ seller: seller });
  console.log(PurchaseRequests);
  res.json(PurchaseRequests);
});

router.post("/deletePurchaseRequest", async (req, res) => {
  const seller = req.body.sellerAddress;
  const products = req.body.products;
  await purchaseRequest.deleteOne({
    seller: seller,
    products: products,
  });
  res.json("Deleted");
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

// What exactly is this API supposed to accomplish !
router.post("/requestAuthentication", async (req, res) => {
  const SellerAddress = req.body.sellerAddress;
  const manufacturerAddress = req.body.manufacturerAddress;
  console.log(SellerAddress);
  console.log(manufacturerAddress);
  var authRequest = new authenticationRequest({
    sellerAddress: SellerAddress,
    manufacturerAddress:manufacturerAddress
  });
  const result = await authRequest.save();
  console.log(result);
  res.json("Successful");
});

router.get("/shopInformation", async (req, res) => {
  const sellerAddress = req.query.sellerAddress;
  console.log(sellerAddress);
  var sellerInfo = await Seller.findOne({ accountAddress: sellerAddress });
  res.json(sellerInfo);
});

router.post("/updateShopInformation", async (req, res) => {
  const sellerAddress = req.body.sellerAddress;
  var sellerInfo = await Seller.findOne({ accountAddress: sellerAddress });
  await sellerInfo.update({
    shopName: req.body.shopName,
    cordinates: req.body.cordinates,
    shopAddress: req.body.shopAddress,
  });
  res.json("completed Updation");
});

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "./files");
//   },
//   filename: (req, file, cb) => {
//     console.log(file);
//     cb(null, Date.now() + path.extname(file.originalname));
//   },
// });

// const upload = multer({ dest: "./files/" });

// router.post("/upload", upload.single("file"), (req, res) => {
//   res.send("success");
// });


router.post('/addProductInSeller',async(req,res)=>{
  const modelNo = req.body.modelNumber;
  const quantity = req.body.quantity;
  const accountAddress = req.body.accountAddress;
  
  // Check if new then add it

  const seller = await Seller.findOne({accountAddress:accountAddress});
  let exists = false;

  console.log(seller);

  seller.product.map(p=>{
    if(p.modelNumber == modelNo) exists = true;
  })

  if(!exists){
    const result = await Seller.updateOne(
      {accountAddress:accountAddress},
      {$push : {product:{modelNumber:modelNo,quantity:quantity}}}
    )
  }else{
    for(let i = 0 ; i< seller.product.length ; i++){
      if(seller.product[i].modelNumber == modelNo){
        seller.product[i].quantity += quantity;
      }
    }
    await seller.save();
  }


  res.json("Successful !");

})


router.get("/getAuthenticationStatus", async(req,res)=>{
  const accountAddress = req.query.accountAddress;
  console.log("yahan account add aya:",accountAddress);
  const seller  = await Seller.findOne({accountAddress:accountAddress});
  console.log("yahan seller aya:",seller);
  res.json(seller.authenticated);
})

router.get("/getSellerProducts", async (req, res) => {
    // Get the address of the Seller
    let accountAddress = req.query.accountAddress;
    const seller = await Seller.findOne({accountAddress:accountAddress});
    // Get Data from Product from Product Db and Send to Front End

    let productData = [];
    // Name, Price, Quantity, Description, Model Number
    for(let i = 0 ; i< seller.product.length ; i++){
      let product = await Product.findOne({modelNo:seller.product[i].modelNumber});
      productData.push({name:product.productName,price:product.price,quantity:product.productNo,description:product.description,modelNo:product.modelNo});
    }

    res.json(productData);
});

module.exports = router;
