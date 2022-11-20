const {
  getAuthContractInstance,
  getProductContractInstance,
} = require("./utils.controller");
var Manufacturer = require("../models/Manufacturer");
var PurchaseRequest = require("../models/purchaseRequest");
var Product = require("../models/Product");
var ProductRequest = require("../models/productRequests");

const {signAccessToken} = require('../helpers/jwt.helper'); 
const createError = require("http-errors");

// sign up manufacturer
const signup = async (req, res) => {
  // Get form data from body
  const {
    userType,
    phoneNumber,
    firstName,
    lastName,
    userName,
    email,
    password,
    accountAddress,
  } = req.body;
  console.log('address : ',accountAddress);
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
    userName,
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
  res.send({accessToken});
};

// login manufacturer
const login = async (req,res) => {
  // Get form data from body
  const {email,password} = req.body;
  // Check if manufacturer exists
  const manufacturer = await Manufacturer.findOne({
    email: email
});
 if(!manufacturer) throw createError.NotFound("User not Registered !");
 const isMatch = await manufacturer.isValidPassword(password);
 if(!isMatch) throw createError.Unauthorized("Invalid Username or Password");
 const accessToken = await signAccessToken(manufacturer.accountAddress);
 // return response
 res.send({accessToken}) 
};

// create a purchase request
const createPurchaseRequest = async (req,res) => {
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

    await ProductRequest.deleteOne({ sellerAddress: sellerAddress, productModelNo:productModelNo, products:products});

    res.json("Request Sent Successfully !");
};

// delete a purchase request
const deletePurchaseRequest = async (req,res) => {
    const sellerAddress = req.body.sellerAddress;
    await ProductRequest.deleteOne({ sellerAddress: sellerAddress });
    res.json("Request Deleted Successfully !");
};

// Add a product to inventory
const addProduct = async (req,res) => {
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

    await product.save();

    const result = await Manufacturer.updateOne(
        {accountAddress: manufacturerAddress},{$push:{productModelNo:modelNo}}
    );

    res.send({message : "Product Successfully Added !"});
};

// Delete a Product
const deleteProduct = async (req,res)=>{
    const productName = req.body.productName;

    await Product.deleteOne({
        productName: productName,
    });

    res.json("Deleted");
}
const getProductByName = async (req,res)=>{
    const productName = req.productName;

    const result = await Product.findOne({
        productName: productName,
    });

    res.json(result);
}

const getManufacturerInfo = async(req,res)=>{
    const accountAddress = req.body.userAddress;
    const data = await Manufacturer.findOne({accountAddress:accountAddress});
    res.send(data);
}

module.exports = {signup,login,addProduct,deleteProduct,getProductByName,createPurchaseRequest,deletePurchaseRequest,getManufacturerInfo};