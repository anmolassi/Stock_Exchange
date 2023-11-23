const user = require("../models/user");
const ordersPending=require("../models/orders_received");
const jwt=require('jsonwebtoken');
const crypto = require("crypto");
module.exports.home = async function (req, res) {
    const token = req.cookies.jwt;
    if(token){
      const id=await jwt.decode(token,{complete:true}).payload._id;
      const userr = await user.findOne({_id:id,"tokens.token":token});
      if(userr){
        let ordersList= await ordersPending.find({user:id});
        res.locals.user=userr;
        res.locals.ordersList=ordersList;
        res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1.
        res.setHeader("Pragma", "no-cache"); // HTTP 1.0.
        res.setHeader("Expires", "0"); // Proxies.
        res.render('ordersPending');
      }else{
        res.clearCookie('jwt');
        res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1.
        res.setHeader("Pragma", "no-cache"); // HTTP 1.0.
        res.setHeader("Expires", "0"); // Proxies.
        return res.render("welcome");
      }
    }
    else{
      res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1.
      res.setHeader("Pragma", "no-cache"); // HTTP 1.0.
      res.setHeader("Expires", "0"); // Proxies.
      return res.render("welcome");
    }
  };