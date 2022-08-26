const mongoose = require("mongoose");
const { Schema } = mongoose;

const SellerSchema = new Schema({
  email:{
    type:String,
    required:true
  },
  password:{
    type:String,
    required:true
  },
  accountAddress:{
    type:String,
    required:true
  },
  authenticated:{
    type:Boolean,
  },
  authenticatedBy:{
    type:String,
  }
});

module.exports = mongoose.model("Seller", SellerSchema);

