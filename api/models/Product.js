const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({

  productNo:{
    type : Number
  },

    //description
  description: {
    type: String,
    require: true,
  },
  //General
  productName: {
    type: String,
    required: true,
  },
  Brand: {
    type: String,
    required: true,
  },
  //TO DO : add check for uinique
  modelNo: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },

  //box dimensions
  height: {
    type: String,
    required: true,
  },
  width: {
    type: String,
    required: true,
  },

  //Display
  displayType: {
    type: String,
    required: true,
  },
  Resolution: {
    type: String,
    required: true,
  },
  HDR: {
    type: String,
    required: true,
  },
  refreshRate : {
    type: String,
    required: true,
  },
  //features
  smartCapable: {
    type: String,
    required: true,
  },
  featuredStreamingServices: {
    type: String,
    required: true,
  },
  screenMirroring: {
    type: String,
    required: true,
  },

  //connectivity
  hdmiInputs: {
    type: String,
    required: true,
  },
  usbInputs : {
    type: String,
    required: true,
  },
  networkCompatibility: {
    type: String,
    required: true,
  },
  
  //audio
  speakers: {
    type: String,
    required: true,
  },
  speakerType : {
    type: String,
    required: true,
  },

  //warranty
  Warranty:{
    type: String,
    required: true,
  },
  WarrantyTime:{
    type: String,
    required: true,
  },

  price : {
    type: String,
    required: true,
  },
  image: String
});

module.exports = mongoose.model("Product", productSchema);