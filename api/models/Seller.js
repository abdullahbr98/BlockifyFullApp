const mongoose = require("mongoose");
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

