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
  BALANCE_ABI,
} = require("../../utils/Constants/ManufacturerSMConstants");
var Manufacturer = require("../../models/Manufacturer");
var Seller = require("../../models/Seller");
var AuthenticationRequest = require("../../models/authenticationRequest");

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
  console.log(manufacturer);
  const contract = new ethers.Contract(
    manufacturer.authContractAddress,
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
  await Seller.updateOne(
    { accountAddress: sellerAddress },
    { $set: { authenticated: true, authenticatedBy: accountAddress } }
  );
  await AuthenticationRequest.deleteOne({ sellerAddress: sellerAddress });
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

router.get("/getAuthenticatedSellers", async (req, res) => {
  const accountAddress = req.query.accountAddress;
  const manufacturer = await Manufacturer.findOne({
    accountAddress: accountAddress,
  });

  const signer = new ethers.providers.JsonRpcProvider(
    "http://localhost:7545"
  ).getSigner(accountAddress);
  console.log(manufacturer);
  console.log(manufacturer.authContractAddress);
  const contract = new ethers.Contract(
    manufacturer.authContractAddress,
    SELLER_AUTHENTICATION_ABI,
    signer
  );

  const result = await contract.get_authenticated_sellers();
  console.log(result);

  // const authenticatedSellers = await Seller.find({authenticated:true});
  res.json(result);
});

router.post("/sendProducts", async (req, res) => {
  const products = req.body.products;
  const price = req.body.price;
  const accountAddress = req.body.accountAddress;
  const conversion = products * price * 235;

  const signer = new ethers.providers.JsonRpcProvider(
    "http://localhost:7545"
  ).getSigner(accountAddress);
  const seller = await Seller.findOne({
    accountAddress: accountAddress,
  });

  // Balance Contract !
  const BalanceContract = new ethers.ContractFactory(
    BALANCE_ABI,
    BALANCE_BYTE_CODE,
    signer
  );

  // Deploying Products Contract for the Manufacturer
  console.log(`Deploying from account : ${signer._address}`);
  const balanceContract = await BalanceContract.deploy();
  await balanceContract.deployed();

  await seller.updateOne(
    { accountAddress: accountAddress },
    { set: { balanceContractAddress: balanceContract.address } }
  );
  const manufacturerAddress = seller.authenticatedBy;
  const manufacturer = await Manufacturer.findOne({
    accountAddress: manufacturerAddress,
  });
  const signer_mnf = new ethers.providers.JsonRpcProvider(
    "http://localhost:7545"
  ).getSigner(manufacturerAddress);
  let contract = new ethers.Contract(
    manufacturer.productsContractAddress,
    PRODUCTS_ABI,
    signer_mnf
  );

  // Transfer of Products !
  const tx1 = await contract.transfer(accountAddress, products);

  contract = new ethers.Contract(balanceContract.address, BALANCE_ABI, signer);
  await contract.setBalance(accountAddress, conversion);
  
  // Transfer of Balance !
  const tx2 = await contract.transfer(manufacturerAddress, conversion);
  //--------------------------------------------------------
  // Product Contract !
  const ProductsContract = new ethers.ContractFactory(
    PRODUCTS_ABI,
    PRODUCTS_BYTE_CODE,
    signer
  );

  // Deploying Products Contract for the Manufacturer
  console.log(`Deploying from account : ${signer._address}`);
  const productsContract = await ProductsContract.deploy();
  await productsContract.deployed();
  // Adding Product Contract Address
  await seller.updateOne(
    { accountAddress: accountAddress },
    { set: { productContractAddress: productsContract.address } }
  );

  const contract_ = new ethers.Contract(
    productsContract.address,
    PRODUCTS_ABI_ABI,
    signer
  );
  
  const tx3 = await contract_.setTotalSupply(products);

  res.json("sending Products");
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
  res.json(
    `${products} Products Transfered from ${accountAddress} to ${sellerAddress}! `
  );
});

module.exports = router;
