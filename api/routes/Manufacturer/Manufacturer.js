// Clean Imports
var express = require("express");
var router = express.Router();
const {signup,login,addProduct,deleteProduct,getProductByName,createPurchaseRequest,deletePurchaseRequest,updateProductQuantity,getManufacturerInfo,getAuthenticationRequest,getManufacturers} = require("../../controllers/manufacturer.controller");
//

// Clean Routes
// Authentication Routes
router.post("/signup", signup); // Tested
router.post("/login", login); // Tested
// Product Routes
router.post("/addProduct",addProduct);
// Purchase Requests Routes
router.post("/purchaseRequest", createPurchaseRequest);
router.post("/deletePurchaseRequest", deletePurchaseRequest);
router.post("/deleteProduct", deleteProduct);
router.post("/updateProductQuantity",updateProductQuantity);
// other Routes
router.get("/getProductByName", getProductByName);
router.post("/getManufacturerInfo",getManufacturerInfo);
router.get("/AuthenticationRequest",getAuthenticationRequest)
router.get("/getManufacturers", getManufacturers);



module.exports = router;
