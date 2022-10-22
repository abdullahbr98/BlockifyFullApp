var express = require("express");
var router = express.Router();
var Product = require("../../models/Product");

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
    const result =  await Product.find();
    res.json(result);
});



module.exports = router;
