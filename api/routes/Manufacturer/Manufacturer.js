// Clean Imports
var express = require("express");
const { providers, utils } = require("ethers");
var router = express.Router();
const {
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
} = require("../../controllers/manufacturer.controller");
const multer = require("multer");

// Clean Routes
// Authentication Routes
router.post("/signup", signup); // Tested
router.post("/login", login); // Tested
// Product Routes
router.post("/addProduct", addProduct);
// Purchase Requests Routes
router.post("/purchaseRequest", createPurchaseRequest);
router.post("/deletePurchaseRequest", deletePurchaseRequest);
router.post("/deleteProduct", deleteProduct);
router.post("/updateProductQuantity", updateProductQuantity);
// other Routes
router.get("/getProductByName", getProductByName);
router.post("/getManufacturerInfo", getManufacturerInfo);
router.get("/AuthenticationRequest", getAuthenticationRequest);
router.get("/getManufacturers", getManufacturers);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post("/upload", upload.single("file"), (req, res) => {
  // req.file is the file that was uploaded
  // do something with the file, such as save it to a database
  const accountAddress = req.body.accountAddress;
  console.log(accountAddress);
  const fs = require("fs");
  fs.rename(req.file.path, `uploads/${Date.now()}`, function (err) {
    if (err) {
      return next(err);
    }
  });

  res.send("File uploaded!");
});

router.get("/getAllTransactions", async (req, res) => {
  const address = req.query.accountAddress;
  const provider = new providers.JsonRpcProvider("http://localhost:7545");

  // Retrieve the latest block
  const latestBlock = await provider.getBlock("latest");
  let result = [];
  // Iterate over the transactions in the block
  for (let i = 0; i < latestBlock.number; i++) {
    let block = await provider.getBlock(i);
    for (const transaction of block.transactions) {
      let transactionDetails = await provider.getTransaction(transaction);
      if (transactionDetails.from.toLowerCase() === address) {
        let d = new Date(block.timestamp * 1000);
        let tx = {
          from: transactionDetails.from,
          to: transactionDetails.to,
          timeStamp:d.toISOString(),
          value: transactionDetails.value._hex,
          gasUsed: transactionDetails.gasLimit._hex,
          gasPrice: transactionDetails.gasPrice._hex,
          gasLimit: transactionDetails.gasLimit._hex,
          minedInBlock: transactionDetails.blockNumber,
          tHash: transaction,
        };
        result.push(tx);
      }
    }
  }

  res.json(result);
});

module.exports = router;
