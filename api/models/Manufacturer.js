const mongoose = require("mongoose");
const { Schema } = mongoose;

const ManufacturerSchema = new Schema({
    userType: {
        type: String,
        required: true,
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
    },
    authContractAddress: {
        type: String,
    },
    productsContractAddress: {
        type: String,
    },
});

module.exports = mongoose.model("Manufacturer", ManufacturerSchema);
