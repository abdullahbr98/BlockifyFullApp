// File Description : Contains Routes for executing smart contract functions associated with contracts of Manufacturer User Type
// Authenticate Seller
// Remove Seller
// Verify Seller
// Total Supply
// Set Total Supply
// Approve
// Transfer
var axios = require("axios");
var express = require("express");
var ethers = require("ethers");
var router = express.Router();
const {
    SELLER_AUTHENTICATION_ABI,
    PRODUCTS_ABI,
    BALANCE_ABI,
    BALANCE_BYTE_CODE,
    PRODUCTS_BYTE_CODE,
} = require("../../utils/Constants/ManufacturerSMConstants");
var Manufacturer = require("../../models/Manufacturer");
var Seller = require("../../models/Seller");
var AuthenticationRequest = require("../../models/authenticationRequest");
var Product = require("../../models/Product");
// const { toBigNumber } = require("web3/lib/utils/utils");

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
    const temp = await Seller.findOne({ accountAddress: sellerAddress });
    const arrayVal = temp.authenticatedBy;
    arrayVal.push(accountAddress);

    //{ $set: { authenticated: true, authenticatedBy: arrayVal } }

    const result = await Seller.updateOne(
        { accountAddress: sellerAddress },
        // { $set: { authenticated: true } },
        { $set: { authenticated: true, authenticatedBy: arrayVal } }
        // { $push: { authenticatedBy: accountAddress } }
    );
    const delete_result = await AuthenticationRequest.deleteOne({ sellerAddress: sellerAddress });
    console.log("DElete result",delete_result)
    console.log(arrayVal);
    console.log(response);
    console.log("new result is:", result);
    res.json(result);
});

// Accepts Request for Removing a Seller
router.post("/remove_seller", async (req, res) => {
    const sellerAddress = req.body.sellerAddress;
    const accountAddress = req.body.accountAddress;
    console.log("in api sellerAdd:", sellerAddress);
    console.log("in api accAdd:", accountAddress);
    const signer = new ethers.providers.JsonRpcProvider(
        "http://localhost:7545"
    ).getSigner(accountAddress);
    const manufacturer = await Manufacturer.findOne({
        accountAddress: accountAddress,
    });
    console.log("manObj:", manufacturer);
    console.log("in api manAddress New:", manufacturer.authContractAddress);
    const contract = new ethers.Contract(
        manufacturer.authContractAddress,
        SELLER_AUTHENTICATION_ABI,
        signer
    );

    console.log("in api contract:", contract.address);
    let response = "";
    try {
        const tx = await contract.remove_seller(sellerAddress);
        response = "Seller Removed !";
    } catch (error) {
        response = "Seller already Unverified !";
    }

    console.log("sellerAddress Before Finding:", sellerAddress);


    const seller = await Seller.findOne({
        accountAddress: sellerAddress,
    });

    console.log("seller Values:", seller);

    const authArray = seller.authenticatedBy;
    let removed = authArray.filter(function(element) {
        return element !== accountAddress; // remove elements that are not equal to 'two'
      });
    await Seller.updateOne(
        {accountAddress : sellerAddress},
        {$set: {authenticated: false, authenticatedBy:removed}}
        );

    // await seller.save();

    console.log("updated!");

    res.json("ok");
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

router.get("/getManufactueresForAuthentication", async (req, res) => {
    const sellerAddress = req.query.sellerAddress;

    const seller = await Seller.findOne({ sellerAddress: sellerAddress });

    const result = await Manufacturer.find({});
    const addresses = [];

    for (let i = 0; i < result.length; i++) {
        for (let j = 0; j < seller.authenticatedBy.length; j++) {
            if (result[i].accountAddress != seller.authenticatedBy[j]) {
                addresses.push({
                    address: result[i].accountAddress,
                    name: result[i].username,
                });
            }
        }
    }
    console.log(result);
    console.log(addresses);
    res.json(addresses);
});

router.post("/sendProducts", async (req, res) => {
    const products = req.body.products; // Quantity
    const price = req.body.price; // Price
    console.log("Price : ", price);
    const manufacturerAddress = req.body.manufacturerAddress;
    const productModelNo = req.body.productModelNo;
    console.log("price", price);
    // const accountAddress = req.body.accountAddress; //sellers address
    console.log("inside body:", req.body);
    const accountAddress = req.body.address; //sellers address
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

    // Create Balance Contract !
    const BalanceContract = new ethers.ContractFactory(
        BALANCE_ABI,
        BALANCE_BYTE_CODE,
        signer
    );

    // Deploying Balance Contract
    console.log(`Deploying from account : ${signer._address}`);
    const balanceContract = await BalanceContract.deploy();
    await balanceContract.deployed();

    console.log("account Address le original:", accountAddress);

    // Update Seller set Balance Contract Address
    await Seller.updateOne(
        { accountAddress: accountAddress },
        { $set: { balanceContractAddress: balanceContract.address } }
    );

    console.log("manufacturer Address New:", manufacturerAddress);

    // Find Manufacturer who authenticated this Seller
    const manufacturer = await Manufacturer.findOne({
        accountAddress: manufacturerAddress,
    });

    // Create Signer for Manufacturer
    const signer_mnf = new ethers.providers.JsonRpcProvider(
        "http://localhost:7545"
    ).getSigner(manufacturerAddress);

    let contract = new ethers.Contract(
        manufacturer.productsContractAddress,
        PRODUCTS_ABI,
        signer_mnf
    );

    // Transfer of Products !
    console.log(
        "manufacturer ka contractAddress product wala: ",
        manufacturer.productsContractAddress
    );
    // await contract.approve(accountAddress, products);
    console.log("pehla approve");
    console.log("type of conversion", typeof products);
    // let bprd = products*Math.pow(10,18);
    let bprd = ethers.utils.parseEther(String(products));
    console.log("Product : ", bprd);
    const tx1 = await contract.transfer(accountAddress, String(products));
    console.log(tx1);
    const balance = await contract.balanceOf(accountAddress);
    console.log("Balance : ", balance);
    contract = new ethers.Contract(
        balanceContract.address,
        BALANCE_ABI,
        signer
    );

    console.log("Calling Set Balance !");
    console.log("Price : ", price);
    await contract.setBalance(accountAddress, String(price));

    console.log("Transfer of Balance from Seller to his Manufacturer");
    const tx2 = await contract.transfer(manufacturerAddress, String(price));

    console.log(tx2);
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
    await Seller.updateOne(
        { accountAddress: accountAddress },
        { $set: { productContractAddress: productsContract.address } }
    );

    const contract_ = new ethers.Contract(
        productsContract.address,
        PRODUCTS_ABI,
        signer
    );

    //Increase Seller productModelNo array
    for (var i = 0; i < products; i++) {
        let check = await Seller.updateOne(
            { accountAddress: accountAddress },
            { $push: { productModelNo: productModelNo } }
        );
        console.log("Check", check);
    }
    //Decrease product no in Product
    const productRetrieved = await Product.findOne({ modelNo: productModelNo });
    const productNo = productRetrieved.productNo;
    const newValue = productNo - products;
    await Product.updateOne(
        { modelNo: productModelNo },
        { $set: { productNo: newValue } }
    );

    console.log("Setting Total Supply of Seller");
    const tx3 = await contract_.setTotalSupply(bprd);
    console.log(tx3);
    // axios.get("http://localhost:3000");
    // res.redirect(303,"http://localhost:3000");
    // res.redirect(307,"http://localhost:3000/Seller/seller");

    res.json("Success !");
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

    const tx = await contract.transfer(sellerAddress, String(products));
    res.json(
        `${products} Products Transfered from ${accountAddress} to ${sellerAddress}! `
    );
});

router.post("/testing", async (req, res) => {
    const productModelNo = req.body.productModelNo;
    const accountAddress = req.body.accountAddress;
    const products = req.body.products;

    // console.log("accountAddress", accountAddress);
    // console.log("sellerAddress From DB", "0x233bad6e876d23db1668f6555d88056f284dfc57");
    // console.log("Check", accountAddress == "0x233bad6e876d23db1668f6555d88056f284dfc57");

    for (var i = 0; i < products; i++) {
        let check = await Seller.updateOne(
            { accountAddress: accountAddress },
            { $push: { productModelNo: productModelNo } }
        );
        console.log("Check", check);
    }
    res.json("moj kardi");
});

module.exports = router;
