var express = require("express");
var router = express.Router();
var axios = require("axios");
const stripe = require("stripe")(process.env.STRIPE_KEY);
var Manufacturer = require("../models/Manufacturer");
var Seller = require("../models/Seller");
var Buyer = require("../models/Buyer");
var Product = require("../models/Product");

const YOUR_DOMAIN = "http://localhost:3000";

router.post("/create-checkout-session", async (req, res) => {
    console.log(req.body);
    const products = req.body.products;
    const address = req.body.address;
    const productModelNo = req.body.modelNo;
    console.log("Product Model No", productModelNo);
    console.log("Address in checkout : ", address);
    const product = await Product.findOne({ modelNo: productModelNo });
    console.log(product);
    console.log("Price : ", product.price);

    const session = await stripe.checkout.sessions.create({
        line_items: [
            {
                // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
                price: product.stripePriceId,
                quantity: products,
            },
        ],
        mode: "payment",
        success_url: `${YOUR_DOMAIN}/paymentSuccessfull/true/${products}/${product.price}/${address}/${productModelNo}`,
        cancel_url: `${YOUR_DOMAIN}?canceled=true`,
    });

//     const successUrl = `${YOUR_DOMAIN}/paymentSuccessfull/true/${products}/${product.price}/${address}/${productModelNo}`;
//     const cancelUrl =`${YOUR_DOMAIN}?canceled=true`;
//     console.log("success url", successUrl);

//     // Set the line items for the Checkout session
//     const lineItems = [
//     {
//         price: product.stripePriceId,
//         quantity: products,
//     }
//     ];

//    const session =  stripe.checkout.sessions.create({
//     success_url: successUrl,
//     cancel_url: cancelUrl,
//     mode: "payment",
//     payment_method_types: ['card'],
//     line_items: lineItems,
//     }, function(err, session) {
//     // Handle the response
//     console.log(err);
//     });

    res.redirect(303, session.url);
});


router.post("/create-checkout-session-buyer", async (req, res) => {
    console.log(req.body);
    const products = req.body.products;
    const buyerAddress = req.body.buyerAddress;
    const productModelNo = req.body.modelNo;
    const sellerAddress = req.body.sellerAddress;

    console.log("Product Model No", productModelNo);
    const product = await Product.findOne({ modelNo: productModelNo });
    console.log(product);
    console.log("Price : ", product.price);

    const session = await stripe.checkout.sessions.create({
        line_items: [
            {
                // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
                price: product.stripePriceId,
                quantity: products,
            },
        ],
        mode: "payment",
        success_url: `${YOUR_DOMAIN}/CheckoutComplete/true/${products}/${product.price}/${buyerAddress}/${productModelNo}/${sellerAddress}`,
        cancel_url: `${YOUR_DOMAIN}?canceled=true`,
    });

    res.redirect(303, session.url);
});


router.get("/stripeIntermediate", async (req, res) => {
    const address = req.query.address;
    const price = req.query.price;
    const products = req.query.products;
    console.log("Stripe Intermediate Route...");
    axios.post("http://localhost:8000/ManufacturerSM/sendProducts", {
        products: products,
        price: price,
        address: address,
    });
    // console.log("reached in intermediate");
});

/* GET home page. */
router.get("/", function (req, res, next) {
    res.render("index", { title: "Express" });
});

router.post("/userLogin", async (req, res) => {
    const accountAddress = req.body.address;
    const email = req.body.email;
    const password = req.body.password;
    // Determine User Type
    let result1 = await Manufacturer.findOne({ email: email });
    let result2 = await Seller.findOne({ email: email });
    let result3 = await Buyer.findOne({ email: email });

    if (result1) {
        const result = await axios.post(
            "http://localhost:8000/Manufacturer/login", //TODO customize this to seller and buyer
            {
                email: email,
                password: password,
                accountAddress: accountAddress,
            }
        );
        res.send(result.data);
    } else if (result2) {
        const result = await axios.post(
            "http://localhost:8000/Seller/login", //TODO customize this to seller and buyer
            {
                email: email,
                password: password,
                accountAddress: accountAddress,
            }
        );
        res.send(result.data);
    } else {
        const result = await axios.post(
            "http://localhost:8000/Buyer/login", //TODO customize this to seller and buyer
            {
                email: email,
                password: password,
                accountAddress: accountAddress,
            }
        );
        res.send(result.data);
    }

    // if (!result) {
    //     result = await Seller.findOne({
    //         accountAddress: accountAddress,
    //     });
    //     // result ? res.json('User Type is Seller !') : 'Undefined User Type !'
    //     const data = await axios.post(
    //         "http://localhost:8000/Seller/login", //TODO customize this to seller and buyer
    //         {
    //             email: email,
    //             password: password,
    //             accountAddress: accountAddress,
    //         }
    //     );
    //     res.json(data.data);
    // } else {
    //     // res.json('User Type is Manufacturer !')
    //     const data = await axios.post(
    //         "http://localhost:8000/Manufacturer/login", //TODO customize this to seller and buyer
    //         {
    //             email: email,
    //             password: password,
    //             accountAddress: accountAddress,
    //         }
    //     );

    //     res.json(data.data);
    // }
});

module.exports = router;
