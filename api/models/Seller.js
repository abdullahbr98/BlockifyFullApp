const mongoose = require("mongoose");
const bcrypt  = require("bcrypt");
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
    authenticatedBy: [{
        type: String,
    }],
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


SellerSchema.pre('save', async function (next) {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(this.password,salt);
        this.password = hashedPassword;
        next();
    } catch (error) {
        next(error);
    }
})

SellerSchema.methods.isValidPassword = async function (password) {
    try {
        return await bcrypt.compare(password,this.password);
    } catch (error) {
        throw error;
    }
}




module.exports = mongoose.model("Seller", SellerSchema);
