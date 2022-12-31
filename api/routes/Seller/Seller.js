// File Description : Contains Dapp Routes for Manufacturer User Type
// Sign Up
// Login
// Purchase Request
var path = require("path");
var multer = require("multer");
var express = require("express");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const {
  SELLER_AUTHENTICATION_ABI,
  PRODUCTS_ABI,
  BALANCE_ABI,
  BALANCE_BYTE_CODE,
  PRODUCTS_BYTE_CODE,
} = require("../../utils/Constants/ManufacturerSMConstants");
var ethers = require("ethers");
var router = express.Router();
var productRequests = require("../../models/productRequests");
var purchaseRequest = require("../../models/purchaseRequest");
var Product = require("../../models/Product");
var Seller = require("../../models/Seller");
var authenticationRequest = require("../../models/authenticationRequest");
const auth = require("../../middleware/auth");
const { signAccessToken } = require("../../helpers/jwt.helper");
const createError = require("http-errors");

router.post("/signup", async (req, res) => {
  // Get form data from body
  const {
    userType,
    phoneNumber,
    firstName,
    lastName,
    username,
    email,
    password,
    sellerAddress,
  } = req.body;
  const accountAddress = sellerAddress;
  console.log("Phone : ", phoneNumber);
  
  // Create buyer
  const seller = new Seller({
    userType,
    phoneNumber,
    firstName,
    lastName,
    username,
    email,
    password,
    accountAddress,
  });

  console.log(seller);
  
  // Save buyer
  await seller.save();
  // Getting Access Token
  const accessToken = await signAccessToken(sellerAddress);
  // Return response
  res.send({ accessToken });
});

router.post("/login", async (req, res) => {
  // Get form data from body
  const { email, password } = req.body;
  // Check if buyer exists
  const seller = await Seller.findOne({
    email: email,
  });
  if (!seller) throw createError.NotFound("User not Registered !");
  const isMatch = await seller.isValidPassword(password);
  if (!isMatch) throw createError.Unauthorized("Invalid Username or Password");
  const accessToken = await signAccessToken(seller.accountAddress);
  // return response
  res.json({
    token: accessToken,
    userType: seller.userType,
    username: seller.username,
  });
});


router.get("/getSellerFromModelNo", async(req, res) => {

  const modelNo = req.query.modelNo;

  


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

router.get("/getAuthenticationStatus", async (req, res) => {
  const accountAddress = req.query.accountAddress;
  console.log("yahan account add aya:", accountAddress);
  const seller = await Seller.findOne({ accountAddress: accountAddress });
  console.log("yahan seller aya:", seller);
  res.json(seller.authenticated);
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

// What exactly is this API supposed to accomplish !
router.post("/requestAuthentication", async (req, res) => {
  const SellerAddress = req.body.sellerAddress;
  const manufacturerAddress = req.body.manufacturerAddress;
  console.log(SellerAddress);
  console.log(manufacturerAddress);
  var authRequest = new authenticationRequest({
    sellerAddress: SellerAddress,
    manufacturerAddress: manufacturerAddress,
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


router.post("/addProductInSeller", async (req, res) => {
  const modelNo = req.body.modelNumber;
  const quantity = req.body.quantity;
  const accountAddress = req.body.accountAddress;

  // Check if new then add it

  const seller = await Seller.findOne({ accountAddress: accountAddress });
  let exists = false;

  console.log(seller);

  seller.product.map((p) => {
    if (p.modelNumber == modelNo) exists = true;
  });

  if (!exists) {
    const result = await Seller.updateOne(
      { accountAddress: accountAddress },
      { $push: { product: { modelNumber: modelNo, quantity: quantity } } }
    );
  } else {
    let productList = seller.product;
    for (let i = 0; i < seller.product.length; i++) {
      if (productList[i].modelNumber == modelNo) {
        const addQuantity = parseInt(quantity);
        const originalProductQuantity = parseInt(productList[i].quantity);
        const newQuantity = addQuantity + originalProductQuantity;
        productList[i].quantity = String(newQuantity);
      }
    }
    await Seller.updateOne(
      {accountAddress : accountAddress},
      {
        $set: { product: productList}
      }
    );
  }

  res.json("Successful !");
});

router.get("/getSellerProducts", async (req, res) => {
  // Get the address of the Seller
  let accountAddress = req.query.accountAddress;
  const seller = await Seller.findOne({ accountAddress: accountAddress });
  // Get Data from Product from Product Db and Send to Front End

  let productData = [];
  // Name, Price, Quantity, Description, Model Number
  for (let i = 0; i < seller.product.length; i++) {
    let product = await Product.findOne({
      modelNo: seller.product[i].modelNumber,
    });
    productData.push({
      name: product.productName,
      price: product.price,
      quantity: seller.product[i].quantity,
      description: product.description,
      modelNo: product.modelNo,
    });
  }

  res.json(productData);
});

router.get("/getAllSellerProducts", async (req, res) => {
  // Get the address of the Seller
  const sellers = await Seller.find();
  // Get Data from Product from Product Db and Send to Front End
  console.log("Sellers", sellers);
  let productData = [];
  // Name, Price, Quantity, Description, Model Number
  for(let j =0; j<sellers.length; j++) {
    const address = sellers[j].accountAddress;
    const seller = await Seller.findOne({accountAddress : address})
    console.log("seller:",seller);
    for (let i = 0; i < seller.product.length; i++) {
      let product = await Product.findOne({
        modelNo: seller.product[i].modelNumber,
      });
      productData.push({
        seller: seller.accountAddress,
        sellerName: seller.username,
        name: product.productName,
        price: product.price,
        quantity: seller.product[i].quantity,
        description: product.description,
        modelNo: product.modelNo,
      });
    }
}
  res.json(productData);
});


router.get("/getSeller", async (req, res) => {
  const sellerAddress = req.query.sellerAddress;
  const seller = await Seller.findOne({ accountAddress: sellerAddress });
  console.log(seller);
  res.json(seller);
});


router.post("/sendProducts", async (req, res) => {
  const products = req.body.products; // Quantity
  const price = req.body.price; // Price
  console.log("Price : ",price);
  const productModelNo = req.body.productModelNo;
  console.log("price", price);
  // const accountAddress = req.body.accountAddress; //sellers address
  console.log("inside body:", req.body);
  const accountAddress = req.body.sellerAddress; //sellers address
  const buyerAddress = req.body.buyerAddress;
  let conversion = products * price;
  conversion = toString(conversion);
  console.log("apna original typeof string", typeof conversion);


  // Seller as Signer
  const signer = new ethers.providers.JsonRpcProvider(
      "http://localhost:7545"
  ).getSigner(accountAddress);

  // Get Seller from DB
  const seller = await Seller.findOne({
      accountAddress: accountAddress,
  });
  console.log("Seller", seller);

  // const buyer = await Buyer.findOne({
  //   accountAddress : buyerAddress,
  // });

  // // Create Balance Contract !
  // const BalanceContract = new ethers.ContractFactory(
  //     BALANCE_ABI,
  //     BALANCE_BYTE_CODE,
  //     signer
  // );
  
  // // Deploying Balance Contract
  // console.log(`Deploying from account : ${signer._address}`);
  // const balanceContract = await BalanceContract.deploy();
  // await balanceContract.deployed();

  // console.log("account Address le original:", accountAddress);
  
  // // Update Seller set Balance Contract Address
  // await seller.updateOne(
  //     { accountAddress: accountAddress },
  //     { $set: { balanceContractAddress: balanceContract.address } }
  // );

  // // Set Manufacturer Address for this Seller
  // const manufacturerAddress = seller.authenticatedBy;

  // console.log(manufacturerAddress);
  
  // // Find Manufacturer who authenticated this Seller
  // const manufacturer = await Manufacturer.findOne({
  //     accountAddress: manufacturerAddress,
  // });

  // Create Signer for Manufacturer
  // const signer_buyer = new ethers.providers.JsonRpcProvider(
  //     "http://localhost:7545"
  // ).getSigner(buyerAddress);


  console.log("Came here", seller.productContractAddress);
  //creating Product Contract signed by seller
  let contract = new ethers.Contract(
      seller.productContractAddress,
      PRODUCTS_ABI,
      signer
  );

  // Transfer of Products !
  console.log(
      "seller ka contractAddress product wala: ",
      seller.productContractAddress
  );
  // await contract.approve(accountAddress, products);
  console.log("pehla approve");
  console.log("type of conversion", typeof products);
  // let bprd = products*Math.pow(10,18); 
  let bprd = ethers.utils.parseEther(String(products));
  console.log("Product : " , bprd);
  const tx1 = await contract.transfer(buyerAddress, String(products));
  console.log(tx1);
  const balance = await contract.balanceOf(buyerAddress);
  console.log("products sent to buyer : ", balance);


  //Updating Seller balance contract
  contract = new ethers.Contract(
      seller.balanceContractAddress,
      BALANCE_ABI,
      signer
  );

  console.log("Calling Set Balance !");
  console.log("Price : ", price);
  await contract.setBalance(accountAddress, String(price));
  const temp = await contract.balanceOf(accountAddress);
  console.log("Balance of seller", temp)
  // console.log("Transfer of Balance from Seller to his Manufacturer");
  // const tx2 = await contract.transfer(manufacturerAddress, String(price));
  
  // console.log(tx2);


  //--------------------------------------------------------
  // // Product Contract  By Buyer!
  // const ProductsContract = new ethers.ContractFactory(
  //     PRODUCTS_ABI,
  //     PRODUCTS_BYTE_CODE,
  //     signer_buyer
  // );

  // Deploying Products Contract for the Manufacturer
  // console.log(`Deploying from account : ${signer_buyer._address}`);
  // const productsContract = await ProductsContract.deploy();
  // await productsContract.deployed();
  // // Adding Product Contract Address
  // await buyer.updateOne(
  //     { accountAddress: accountAddress },
  //     { $set: { productContractAddress: productsContract.address } }
  // );

  // const contract_ = new ethers.Contract(
  //     productsContract.address,
  //     PRODUCTS_ABI,
  //     signer_buyer
  // );

  //Decrease quantity of Seller Products
  const quantity = seller.quantity - products;
  const sellerArray = seller.product;
  for(let i=0; i<sellerArray.length; i++){  //2
    if(productModelNo === sellerArray[i].modelNumber){
      console.log("seller bhai ke products before decrement:",sellerArray[i].quantity );
      sellerArray[i].quantity -= products;
      console.log("seller bhai ke products after decrement:",sellerArray[i].quantity );
    }
  }
  console.log("sellerArray printed here",sellerArray);
  await Seller.updateOne(
    {accountAddress : accountAddress},
    {$set: {product: sellerArray}}
  )

 

  
  // console.log("Setting Total Supply of Seller");
  // const tx3 = await contract_.setTotalSupply(bprd);
  // console.log(tx3);
  // axios.get("http://localhost:3000");
  // res.redirect(303,"http://localhost:3000");
  // res.redirect(307,"http://localhost:3000/Seller/seller");
  
  res.json(tx1)

});



module.exports = router;
