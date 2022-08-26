// File Description : Contains Routes for executing smart contract functions associated with contracts of Manufacturer User Type
// Authenticate Seller
// Remove Seller
// Verify Seller
// Total Supply
// Set Total Supply
// Approve
// Transfer


var express = require("express");
var ethers = require("ethers");
var router = express.Router();
const {
  SELLER_AUTHENTICATION_ABI,
  PRODUCTS_ABI,
} = require("../../utils/Constants/ManufacturerSMConstants");
var Manufacturer = require("../../models/Manufacturer");
var Seller = require("../../models/Seller");


// Routes for Authenticate_Seller SM Functions
// Accepts Request for Authenticating a Seller on Blockchain
router.post("/authenticate_seller", async (req, res) => {
  const sellerAddress = req.body.sellerAddress;
  const accountAddress = req.body.accountAddress;
  const signer = new ethers.providers.JsonRpcProvider(
    "http://localhost:7545"
  ).getSigner(accountAddress);
  const manufacturer = await Manufacturer.findOne({
    accountAddress: accountAddress,
  });
  const contract = new ethers.Contract(
    manufacturer.productsContractAddress,
    SELLER_AUTHENTICATION_ABI,
    signer
  );
  let response = "";
  try {
    const tx = await contract.authenticate_seller(sellerAddress);
    response = "Seller Verified !";
  } catch (error) {
    response = "Seller already Verified !";
  }

  // Updating Seller Information 
  await Seller.updateOne({accountAddress:sellerAddress}, {$set:{authenticated:true,authenticatedBy:accountAddress}})

  res.json(response);
});

// Accepts Request for Removing a Seller
router.post("/remove_seller", async (req, res) => {
  const sellerAddress = req.body.sellerAddress;
  const accountAddress = req.body.accountAddress;
  const signer = new ethers.providers.JsonRpcProvider(
    "http://localhost:7545"
  ).getSigner(accountAddress);
  const manufacturer = await Manufacturer.findOne({
    accountAddress: accountAddress,
  });
  const contract = new ethers.Contract(
    manufacturer.contractAddress,
    SELLER_AUTHENTICATION_ABI,
    signer
  );

  let response = "";
  try {
    const tx = await contract.remove_seller(sellerAddress);
    response = "Seller Removed !";
  } catch (error) {
    response = "Seller already Unverified !";
  }

  res.json(response);
});

// Route to Verify Seller
router.get("/verify_seller", async (req, res) => {
  const sellerAddress = req.query.sellerAddress;
  const accountAddress = req.query.accountAddress;
  const signer = new ethers.providers.JsonRpcProvider(
    "http://localhost:7545"
  ).getSigner(accountAddress);
  const manufacturer = await Manufacturer.findOne({
    accountAddress: accountAddress,
  });
  const contract = new ethers.Contract(
    manufacturer.contractAddress,
    SELLER_AUTHENTICATION_ABI,
    signer
  );
  const result = await contract.verify_seller(sellerAddress);
  const response = result ? "Verified" : "Un-Verified";

  res.json(response);
});

router.get("/total_supply", async (req, res) => {
  const accountAddress = req.query.accountAddress;
  const signer = new ethers.providers.JsonRpcProvider(
    "http://localhost:7545"
  ).getSigner(accountAddress);
  console.log(accountAddress);
  const manufacturer = await Manufacturer.findOne({
    accountAddress: accountAddress,
  });
  const contract = new ethers.Contract(
    manufacturer.productsContractAddress,
    PRODUCTS_ABI,
    signer
  );
  const totalSupply = await contract.totalSupply();
  const ctotalSupply = ethers.utils.formatUnits(totalSupply, 0);
  res.json({ totalSupply: ctotalSupply });
});

router.post("/set_total_supply", async (req, res) => {
  const accountAddress = req.body.accountAddress;
  const totalSupply = req.body.totalSupply;
  const signer = new ethers.providers.JsonRpcProvider(
    "http://localhost:7545"
  ).getSigner(accountAddress);
  console.log(accountAddress);
  const manufacturer = await Manufacturer.findOne({
    accountAddress: accountAddress,
  });
  const contract = new ethers.Contract(
    manufacturer.productsContractAddress,
    PRODUCTS_ABI,
    signer
  );
  const tx = await contract.setTotalSupply(totalSupply);

  res.json(`Total Supply updated to ${totalSupply}`);
});

router.post("/approve", async (req, res) => {
  const accountAddress = req.body.accountAddress;
  const sellerAddress = req.body.sellerAddress;
  const products = req.body.products;
  const signer = new ethers.providers.JsonRpcProvider(
    "http://localhost:7545"
  ).getSigner(accountAddress);
  const manufacturer = await Manufacturer.findOne({
    accountAddress: accountAddress,
  });
  const contract = new ethers.Contract(
    manufacturer.productsContractAddress,
    PRODUCTS_ABI,
    signer
  );

  const tx = await contract.approve(sellerAddress, products);
  res.json("Approved!");
});


router.post("/transfer", async (req, res) => {
  const accountAddress = req.body.accountAddress;
  const sellerAddress = req.body.sellerAddress;
  const products = req.body.products;
  const signer = new ethers.providers.JsonRpcProvider(
    "http://localhost:7545"
  ).getSigner(accountAddress);
  const manufacturer = await Manufacturer.findOne({
    accountAddress: accountAddress,
  });
  const contract = new ethers.Contract(
    manufacturer.productsContractAddress,
    PRODUCTS_ABI,
    signer
  );

  const tx = await contract.transfer(sellerAddress, products);
  res.json(`${products} Products Transfered from ${accountAddress} to ${sellerAddress}! `);
});

module.exports = router;
