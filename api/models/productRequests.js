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
});

module.exports = mongoose.model("productRequests", productRequestsSchema);

