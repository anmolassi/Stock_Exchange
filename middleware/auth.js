const jwt = require('jsonwebtoken');
const user= require('../models/user');
//middleware function require next() argument
const auth = async (req,res,next)=>{
    try{
        const token = req.cookies.jwt;
        const verifyuser = jwt.verify(token,"secretkey_likhdo_koi_v");
        console.log(verifyuser);
        const userr=await user.findOne({_id:verifyuser._id});
        console.log(userr.first_name);
        req.token=token;
        req.user=userr;
        next();
    }catch(err){
        // res.status(401).send(err);
        res.redirect('/');
    }
}
module.exports=auth;