const jwt = require("jsonwebtoken");
const createError = require("http-errors");

module.exports = {
    signAccessToken : (userId) =>{
        return new Promise((resolve,reject)=>{
            // payload,key,options
            const payload = {};
            const secret = process.env.ACCESS_TOKEN_SECRET;
            const options = {
              expiresIn:'1h',
              issuer:"Blockify.com",
              audience:userId
            };
            jwt.sign(payload,secret,options,(err,token)=>{
                if(err) {
                    console.log(err.message);
                    reject(createError.InternalServerError());
                }
                resolve(token);
            })
        })
    }
}