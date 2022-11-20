const {signAccessToken} = require('../helpers/jwt.helper'); 
const createError = require("http-errors");
var Buyer = require("../models/Buyer");


// sign up buyer
const signup = async (req, res) => {
  // Get form data from body
  const {
    userType,
    phoneNumber,
    firstName,
    lastName,
    userName,
    email,
    password,
    accountAddress,
  } = req.body;
  
  // Create buyer
  const buyer = new Buyer({
    userType,
    phoneNumber,
    firstName,
    lastName,
    userName,
    email,
    password,
    accountAddress,
  });
  // Save buyer
  await buyer.save();
  // Getting Access Token
  const accessToken = await signAccessToken(accountAddress);
  // Return response
  res.send({accessToken});
};

// login buyer
const login = async (req,res) => {
    // Get form data from body
    const {email,password} = req.body;
    // Check if buyer exists
    const buyer = await Buyer.findOne({
      email: email
  });
   if(!buyer) throw createError.NotFound("User not Registered !");
   const isMatch = await buyer.isValidPassword(password);
   if(!isMatch) throw createError.Unauthorized("Invalid Username or Password");
   const accessToken = await signAccessToken(buyer.accountAddress);
   // return response
   res.send({accessToken}) 
  };

module.exports = {signup,login}