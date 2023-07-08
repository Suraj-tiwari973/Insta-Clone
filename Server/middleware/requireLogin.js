const jwt = require("jsonwebtoken");
const {JWT_SECRET} = require("../keys");
const mongoose = require("mongoose");
const User = mongoose.model("User");

module.exports = (req,res,next)=>{   // this is the middleware to verfy the user token...
    const {authorization} = req.headers;
    if(!authorization){
       return res.status(401).json({error:"You must be logged In"});
    }
    const token = authorization.replace("Bearer ","");
    jwt.verify(token,JWT_SECRET,(err,payload)=>{       // verfying the user token...
        if(err){
           return res.status(401).json({error:"You must be logged In"});
        }

        const {_id} = payload;
        User.findById(_id).then(userData=>{
            req.User = userData;
            next()    // next is used to stop this middleware and tko execute the next code or middleware...
        })

        
    });
}