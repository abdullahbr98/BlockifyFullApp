const mongoose = require("mongoose");
const { Schema } = mongoose;


const orderSchema = new Schema({ 
    orderId: {
        type: String,
    },

    //description
    items: {
        type: String,
    },
    //General
    orderAmount: {
        type: String,
    },

    orderDate: {
        type: String,
    },

    //TO DO : add check for uinique
    paymentMethod: {
        type: String,
    },

    paymentStatus: {
        type: String,
    },

    orderStatus: {
        type: String,
    },

    buyerAddress: {
        type: String,
    },

    sellerAddress: {
        type: String
    }

    
});

module.exports = mongoose.model(
    "Orders",
    orderSchema
);