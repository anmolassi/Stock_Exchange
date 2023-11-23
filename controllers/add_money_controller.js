const user = require("../models/user");
const ordersReceived=require("../models/orders_received")
const bcrypt = require("bcryptjs");
const jwt=require('jsonwebtoken');
const Mailer = require("../config/Nodemailer");
module.exports.addMoneyPage = async function (req, res){
    const token = req.cookies.jwt;
    if (token) {
        const id=await jwt.decode(token,{complete:true}).payload._id;
        let userr = await user.findOne({_id:id,"tokens.token":token});
        if(userr){
            res.locals.user=userr;
            res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1.
            res.setHeader("Pragma", "no-cache"); // HTTP 1.0.
            res.setHeader("Expires", "0"); // Proxies.
            res.render("add_money_page");
        }else{
            res.render("oversmart");
        }
    }else{
        res.redirect('/login');
    }
    
}
module.exports.addMoney = async function (req, res) {
  console.log("hi");
  const token = req.cookies.jwt;
  if (token) {
    console.log(token);
    const id=await jwt.decode(token,{complete:true}).payload._id;
    let userr = await user.findOne({_id:id,"tokens.token":token});
        if(userr){
            let a=parseFloat(Number(userr.fund)+Number(req.body.addmoney)).toFixed(2);
            await user.findOneAndUpdate({_id:userr._id},{fund:a});
            res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1.
            res.setHeader("Pragma", "no-cache"); // HTTP 1.0.
            res.setHeader("Expires", "0"); // Proxies.
            res.redirect('/');
        }else{
            res.render("oversmart");
        }
    }else{
        res.locals.title = "login";
        res.render("login");
    }
};