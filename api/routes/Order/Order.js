var axios = require("axios");
var express = require("express");
var ethers = require("ethers");
var router = express.Router();
var Order = require("../../models/Orders");
var Seller = require("../../models/Seller");
const CryptoJS = require('crypto-js');



function createRandomOrderId(){

    // Generate a random string
    var randomString = Math.random().toString(8).substring(2, 4) + Math.random().toString(8).substring(2, 14);

    // Create a hash of the random string using SHA3
    var hash = CryptoJS.SHA3(randomString, { outputLength: 32 });

    console.log(hash.toString()); // Outputs the hash as a hexadecimal string

    return hash;
}

router.post("/placeOrder", async (req, res)=>{

    const {items, orderAmount, orderDate, paymentMethod, 
        paymentStatus, orderStatus, buyerAddress, sellerAddress} = req.body;

const orderId = createRandomOrderId();


const order = new Order({
    orderId,
    items,
    orderAmount,
    orderDate,
    paymentMethod,
    paymentStatus,
    orderStatus,
    buyerAddress,
    sellerAddress
});

await order.save();

res.json(order);

});


router.post("/changeOrderStatus", async (req, res)=> {

    const orderId = req.body.orderId;
    const orderStatus = req.body.orderStatus;

    await Order.updateOne(
        {orderId : orderId},
        {$set : {orderStatus : orderStatus}}
        );

    res.json("changed");
});


router.get("/getOrderStatus", async(req, res)=> {
    const orderId = req.query.orderId;

    console.log(orderId);
    const order = await Order.findOne({
        orderId: orderId
    })

    res.json(order.orderStatus)
});


module.exports = router;