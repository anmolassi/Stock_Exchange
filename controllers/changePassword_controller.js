const User = require("../models/user");
const bcrypt = require("bcryptjs");
const resetPassword=require('../models/reset_password');
module.exports.pageToChangePassword=async function(req,res){
    try {
        let resetCheck=await resetPassword.findOneAndDelete({accessToken:req.params.key}).populate('user','_id first_name last_name');
        // console.log(resetCheck);
        if(resetCheck){
            let user=await User.findOne({_id:resetCheck.user._id});
            if(user){
              res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1.
              res.setHeader("Pragma", "no-cache"); // HTTP 1.0.
              res.setHeader("Expires", "0"); // Proxies.
                return res.render('changePassword', {
                  user: user,
                });
            }else{
                res.locals.action='nosuchuser';
                res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1.
                res.setHeader("Pragma", "no-cache"); // HTTP 1.0.
                res.setHeader("Expires", "0"); // Proxies.
                res.render('action');
            }
        }
        else{
          res.locals.action='nosuchuser';
          res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1.
          res.setHeader("Pragma", "no-cache"); // HTTP 1.0.
          res.setHeader("Expires", "0"); // Proxies.
          res.render('action');
        }
      } catch (err) {
        console.log("Error", err);
        res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1.
        res.setHeader("Pragma", "no-cache"); // HTTP 1.0.
        res.setHeader("Expires", "0"); // Proxies.
        return res.redirect("/");
      }
}

module.exports.setNewPassword=async function(req,res){
  if(req.body.new_password==undefined||req.body.user_id==undefined){
    res.render('oversmart');
    return;
  }
  const user=await User.findOneAndUpdate({_id:req.body.user_id},{password:await bcrypt.hash(req.body.new_password, 10)},{new:true});
  console.log(user);
  const token = await user.generateAuthToken();
  console.log(token);
  res.cookie("jwt", `${token}`, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: 'strict'
      // secure:true
  });
  res.redirect('/');
}