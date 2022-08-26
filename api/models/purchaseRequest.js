const mongoose = require("mongoose");
const { Schema } = mongoose;

const purchaseRequestSchema = new Schema({
  manufacturer: {
    type: String,
    required: true,
  },
  seller: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    required: true,
  },
});

module.exports = mongoose.model("PurchaseRequest", purchaseRequestSchema);
