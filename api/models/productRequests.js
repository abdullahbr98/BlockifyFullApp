const mongoose = require("mongoose");
const { Schema } = mongoose;

const productRequestsSchema = new Schema({
  sellerAddress: {
    type: String,
    require: true,
  },
  products: {
    type: Number,
    required: true,
  },
  productModelNo: {
    type : String
  }
});

module.exports = mongoose.model("productRequests", productRequestsSchema);

