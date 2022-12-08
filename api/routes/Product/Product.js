var express = require("express");
const Manufacturer = require("../../models/Manufacturer");
var router = express.Router();
var Product = require("../../models/Product");
var Seller = require('../../models/Seller')

router.get("/getProductByName", async (req, res) => {
    const productName = req.query.productName;
    console.log(productName);

    const result = await Product.findOne({
        productName: productName,
    });
    console.log(result);
    res.json(result);
});

router.get("/getProductByModelNo", async (req, res) => {
    const modelNo = req.query.modelNo;
    console.log(modelNo);

    const result = await Product.findOne({
        modelNo: modelNo,
    });
    console.log(result);
    res.json(result);
});

router.get("/getAllProducts", async(req, res) => {
    const manufacturerAddress = req.query.manufacturerAddress;
    const manufacturer =  await Manufacturer.find({accountAddress:manufacturerAddress});
    const result = [];
    for(let i = 0 ; i < manufacturer[0].product.length ; i++){
        let product = await Product.find({modelNo:manufacturer[0].product[i].modelNumber});
        result.push(product[0]);
    }
    console.log(result);
    res.json(result);
});

router.get("/getAllProductsSeller", async(req, res) => {
    const sellerAddress = req.query.sellerAddress;
    const seller =  await Seller.findOne({accountAddress:sellerAddress});
    console.log("Seller : ", seller)
    const result = [];
    for(let i = 0 ; i < seller.product.length ; i++){
        let product = await Product.findOne({modelNo:seller.product[i].modelNumber});
        result.push({item:product,quantity:seller.product[i].quantity});
    }
    console.log(result);
    res.json(result);
});



module.exports = router;
