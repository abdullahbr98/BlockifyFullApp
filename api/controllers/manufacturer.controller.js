const {
  getAuthContractInstance,
  getProductContractInstance,
} = require("./utils.controller");
var Manufacturer = require("../models/Manufacturer");
var PurchaseRequest = require("../models/purchaseRequest");
var Product = require("../models/Product");
var ProductRequest = require("../models/productRequests");
var authenticationRequest = require("../models/authenticationRequest");
var Seller = require("../models/Seller");
const {
  SELLER_AUTHENTICATION_ABI,
  PRODUCTS_ABI,
  BALANCE_ABI,
  BALANCE_BYTE_CODE,
  PRODUCTS_BYTE_CODE,
} = require("../utils/Constants/ManufacturerSMConstants");
var ethers = require("ethers");
var Manufacturer = require("../models/Manufacturer");



const { signAccessToken } = require("../helpers/jwt.helper");
const createError = require("http-errors");

// sign up manufacturer
const signup = async (req, res) => {
  // Get form data from body
  const {
    userType,
    phoneNumber,
    firstName,
    lastName,
    username,
    email,
    password,
    accountAddress,
  } = req.body;
  console.log("First Name : ", firstName);
  console.log("address : ", accountAddress);
  // Create contracts
  const authContract = getAuthContractInstance(
    "http://localhost:7545",
    accountAddress
  );
  const productContract = getProductContractInstance(
    "http://localhost:7545",
    accountAddress
  );
  // Get Contract Addresses
  const authContractAddress = (await authContract).address;
  const productsContractAddress = (await productContract).address;
  // Create manufacturer
  const manufacturer = new Manufacturer({
    userType,
    phoneNumber,
    firstName,
    lastName,
    username,
    email,
    password,
    accountAddress,
    authContractAddress,
    productsContractAddress,
  });
  // Save manufacturer
  await manufacturer.save();
  // Getting Access Token
  const accessToken = await signAccessToken(accountAddress);
  // Return response
  res.send({ accessToken });
};

// login manufacturer
const login = async (req, res) => {
  // Get form data from body
  const { email, password } = req.body;
  // Check if manufacturer exists
  const manufacturer = await Manufacturer.findOne({
    email: email,
  });
  console.log(manufacturer);
  // if (!manufacturer) throw createError.NotFound("User not Registered !");
  // const isMatch = await manufacturer.isValidPassword(password);
  // if (!isMatch) throw createError.Unauthorized("Invalid Username or Password");
  const accessToken = await signAccessToken(manufacturer.accountAddress);
  console.log("Type : ", manufacturer.userType);
  console.log("Name : ", manufacturer.username);
  // return response
  res.json({
    token: accessToken,
    userType: manufacturer.userType,
    username: manufacturer.username,
  });
};

// create a purchase request
const createPurchaseRequest = async (req, res) => {
  const sellerAddress = req.body.sellerAddress;
  const manufacturerAddress = req.body.manufacturerAddress;
  const products = req.body.products;
  const productModelNo = req.body.productModelNo;

  // Create a Purchase Request and Save in Database
  const purchaseRequest_ = new PurchaseRequest({
    manufacturer: manufacturerAddress,
    seller: sellerAddress,
    status: false,
    products: products,
    productModelNo: productModelNo,
  });
  await purchaseRequest_.save();

  await ProductRequest.deleteOne({
    sellerAddress: sellerAddress,
    productModelNo: productModelNo,
    products: products,
  });

  res.json("Request Sent Successfully !");
};

// delete a purchase request
const deletePurchaseRequest = async (req, res) => {
  const sellerAddress = req.body.sellerAddress;
  await ProductRequest.deleteOne({ sellerAddress: sellerAddress });
  console.log("something happened here:", sellerAddress);
  res.json("Request Deleted Successfully !");
};

// Add a product to inventory
const addProduct = async (req, res) => {
  const {
    productNo,
    description,
    productName,
    Brand,
    modelNo,
    color,
    height,
    width,
    displayType,
    Resolution,
    HDR,
    refreshRate,
    smartCapable,
    featuredStreamingServices,
    screenMirroring,
    hdmiInputs,
    usbInputs,
    networkCompatibility,
    speakers,
    speakerType,
    Warranty,
    WarrantyTime,
    price,
    manufacturerAddress,
  } = req.body;

  const product = new Product({
    productNo,
    description,
    productName,
    Brand,
    modelNo,
    color,
    height,
    width,
    displayType,
    Resolution,
    HDR,
    refreshRate,
    smartCapable,
    featuredStreamingServices,
    screenMirroring,
    hdmiInputs,
    usbInputs,
    networkCompatibility,
    speakers,
    speakerType,
    Warranty,
    WarrantyTime,
    price,
  });


  console.log("Account Address : ",manufacturerAddress);

  // Find Manufacturer who authenticated this Seller
  const manufacturer = await Manufacturer.findOne({
    accountAddress: manufacturerAddress,
  });

  console.log("BP - 1");

  const signer_mnf = new ethers.providers.JsonRpcProvider(
    "http://localhost:7545"
  ).getSigner(2);
  


  console.log("BP - 2");

  let contract = new ethers.Contract(
    manufacturer.productsContractAddress,
    PRODUCTS_ABI,
    signer_mnf
  );
  
  console.log("BP - 3");
  

  await contract.setTotalSupply(productNo);
  console.log("after setting supply");

  const tx = await contract.totalSupply();
  console.log('Total Supply : ' + tx);

  await product.save();

  console.log("Manufacturer Address : ", manufacturerAddress);

  const result = await Manufacturer.updateOne(
    { accountAddress: manufacturerAddress },
    { $push: { product: { modelNumber: modelNo, quantity: productNo } } }
  );

  console.log(result);

  console.log("Result : ", result);

  res.send({ message: "Product Successfully Added !" });
};

// Delete a Product
const deleteProduct = async (req, res) => {
  const productName = req.body.productName;

  await Product.deleteOne({
    productName: productName,
  });

  res.json("Deleted");
};

const updateProductQuantity = async (req, res) => {
  const accountAddress = req.body.accountAddress;
  const quantity = req.body.quantity;
  const modelNo = req.body.modelNumber;

  const seller = await Seller.findOne({ accountAddress: accountAddress });

  const manufacturer = await Manufacturer.findOne({
    accountAddress: seller.authenticatedBy,
  });

  for (let i = 0; i < manufacturer.product.length; i++) {
    if (manufacturer.product[i].modelNumber == modelNo) {
      manufacturer.product[i].quantity -= quantity;
    }
  }
  manufacturer.save();

  res.json("Updated Successfully !");
};

const getProductByName = async (req, res) => {
  const productName = req.productName;

  const result = await Product.findOne({
    productName: productName,
  });

  res.json(result);
};

const getManufacturerInfo = async (req, res) => {
  const accountAddress = req.body.userAddress;
  const data = await Manufacturer.findOne({ accountAddress: accountAddress });
  res.send(data);
};

const getAuthenticationRequest = async (req, res) => {
  //
  const manufacturerAddress = req.query.manufacturerAddress;
  const request = await authenticationRequest.find({
    manufacturerAddress: manufacturerAddress,
  });
  console.log("Requests : ", request);
  res.json(request);
};

const getManufacturers = async (req, res) => {
  const result = await Manufacturer.find({});
  const addresses = [];
  result.map((item) => {
    addresses.push({ address: item.accountAddress, name: item.username });
  });
  console.log(result);
  console.log(addresses);
  res.json(addresses);
};

module.exports = {
  signup,
  login,
  addProduct,
  deleteProduct,
  getProductByName,
  createPurchaseRequest,
  deletePurchaseRequest,
  updateProductQuantity,
  getManufacturerInfo,
  getAuthenticationRequest,
  getManufacturers,
};
