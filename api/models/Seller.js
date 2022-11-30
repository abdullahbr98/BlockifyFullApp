const mongoose = require("mongoose");
let Product = require('../models/Product');
const { Schema } = mongoose;

const SellerSchema = new Schema({
    userType: {
        type: String,
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    accountAddress: {
        type: String,
        required: true,
        unique: true // Changes made !
    },
    authenticated: {
        type: Boolean,
    },
    authenticatedBy: {
        type: String,
    },
    //jwt
    token: {
        type: String,
    },
    shopName: {
        type: String,
    },
    cordinates: {
        type: String,
    },
    shopAddress: {
        type: String,
    },
    balanceContractAddress:{
        type:String,
    },
    productContractAddress:{
        type:String
    },
    documents : {
        type : Buffer
    },
    product : [
        {
            modelNumber : String,
            quantity : Number
        }
    ]
});

module.exports = mongoose.model("Seller", SellerSchema);
