const mongoose = require("mongoose");
const { Schema } = mongoose;

const autheticationRequestSchema = new Schema({
    sellerAddress: {
        type: String,
        require: true,
    },
});

module.exports = mongoose.model(
    "autheticationRequest",
    autheticationRequestSchema
);
