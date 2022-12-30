const mongoose = require("mongoose");
const { Schema } = mongoose;

const authenticationRequestSchema = new Schema({
    sellerAddress: {
        type: String,
        require: true,
    },
    // Adding a new attribute
    manufacturerAddress:{
        type:String
    }
});

module.exports = mongoose.model(
    "authenticationRequest",
    authenticationRequestSchema
);
