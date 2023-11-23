const mailer = require('../config/Nodemailer');
const User = require("../models/user");
const resetPassword=require('../models/reset_password');
const crypto = require("crypto");
module.exports.generateForgotMail=async function(req,res){
    try {
        if(req.body.email==undefined){
          res.render('oversmart');
          return;
        }
        let token = crypto.randomBytes(20).toString("hex");
        let userr = await User.findOne({ email: req.body.email });
        if (userr) {
          let resetPass = await resetPassword.create({
            user: userr._id,
            accessToken: token,
            isValid: true,
          });
          resetPass = await resetPass.populate("user", "first_name last_name email");
          console.log(token);
          mailer.setPasswordMailSend(resetPass);
        }
        else{
          res.locals.action='nosuchuser';
          res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1.
          res.setHeader("Pragma", "no-cache"); // HTTP 1.0.
          res.setHeader("Expires", "0"); // Proxies.
          res.render('action');
        }
        res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1.
        res.setHeader("Pragma", "no-cache"); // HTTP 1.0.
        res.setHeader("Expires", "0"); // Proxies.
        return res.redirect("/");
      } catch (err) {
        console.log("Error", err);
        res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1.
        res.setHeader("Pragma", "no-cache"); // HTTP 1.0.
        res.setHeader("Expires", "0"); // Proxies.
        return res.redirect("/");
      }
}