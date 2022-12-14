// Clean Imports
var express = require("express");
var path = require("path");
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
    const filename = Date.now() + path.basename(req.file.path);
    fs.rename(req.file.path, `public/images/${filename}`, function (err) {
        if (err) {
            return next(err);
        }
    });

    res.send(`/images/${filename}`);
});

router.get("/getSingleTransaction", async (req, res) => {
    const address = req.query.accountAddress;
    const provider = new providers.JsonRpcProvider("http://localhost:7545");
    console.log("address of acc in trans:", address);
    // Retrieve the latest block
    const latestBlock = await provider.getBlock("latest");
    let result = [];
    // Iterate over the transactions in the block

    let i = 0;
    while (i < latestBlock.number) {
        let block = await provider.getBlock(i);
        for (const transaction of block.transactions) {
            let transactionDetails = await provider.getTransaction(transaction);
            if (transactionDetails.from === address) {
                let d = new Date(block.timestamp * 1000);
                let tx = {
                    from: transactionDetails.from,
                    to: transactionDetails.to,
                    timeStamp: d.toISOString(),
                    value: transactionDetails.value._hex,
                    gasUsed: transactionDetails.gasLimit._hex,
                    gasPrice: transactionDetails.gasPrice._hex,
                    gasLimit: transactionDetails.gasLimit._hex,
                    minedInBlock: transactionDetails.blockNumber,
                    tHash: transaction,
                };
                result.push(tx);
                i = latestBlock.number;
            }
        }
        i++;
    }
    console.log("result from api:", result);
    res.json(result);
});

router.get("/getAllTransactions", async (req, res) => {
    const address = req.query.accountAddress;
    const provider = new providers.JsonRpcProvider("http://localhost:7545");
    console.log("address of acc in trans:", address);
    // Retrieve the latest block
    const latestBlock = await provider.getBlock("latest");
    let result = [];
    // Iterate over the transactions in the block
    for (let i = 0; i < latestBlock.number; i++) {
        let block = await provider.getBlock(i);
        for (const transaction of block.transactions) {
            let transactionDetails = await provider.getTransaction(transaction);
            if (transactionDetails.from === address) {
                let d = new Date(block.timestamp * 1000);
                let tx = {
                    from: transactionDetails.from,
                    to: transactionDetails.to,
                    timeStamp: d.toISOString(),
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
    console.log("result from api:", result);
    res.json(result);
});

module.exports = router;
