const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt  = require("bcrypt");

const BuyerSchema = new Schema({
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
    accountAddress: {
        type: String,
        required: true,
    }
})

BuyerSchema.pre('save', async function (next) {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(this.password,salt);
        this.password = hashedPassword;
        next();
    } catch (error) {
        next(error);
    }
})

BuyerSchema.methods.isValidPassword = async function (password) {
    try {
        return await bcrypt.compare(password,this.password);
    } catch (error) {
        throw error;
    }
}



module.exports = mongoose.model("Buyer", BuyerSchema);