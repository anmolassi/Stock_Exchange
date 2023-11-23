const user = require("../models/user");
const ordersReceived=require("../models/orders_received")
const bcrypt = require("bcryptjs");
const jwt=require('jsonwebtoken');
const Mailer = require("../config/Nodemailer");
const ordersExecuted=require("../models/orders_executed");
module.exports.placeOrder = async function (req, res) {
  console.log("hi");
  const token = req.cookies.jwt;
  if (token) {
    const id=await jwt.decode(token,{complete:true}).payload._id;
    let userr = await user.findOne({_id:id,"tokens.token":token});
    if(userr){
    const shareSymbol=req.body.symbol;
    const totalBrokrage=req.body.quote_total_brokrage;
    const totalCostPaid=req.body.quote_total_cost;
    const identifier=req.body.identifier;
    console.log("Identifier:     ",identifier);
    let cost=Number(userr.pending_orders_fund_book) + Number(totalCostPaid);
    if(cost <= userr.fund){
        const orderPlace= await ordersReceived.create({
            user: id,
            costPerUnit:req.body.quote_cost_unit,
            shareSymbol:shareSymbol,
            totalBrokrage:totalBrokrage,
            totalCost:totalCostPaid,
            identifier:identifier,
        });
      //   await ordersExecuted.create({
      //     user:userr._id,
      //     order:orderPlace._id,
      //     symbol:shareSymbol,
      //     costPerUnit:req.body.quote_cost_unit,
      //     sellPerUnit:"-",
      //     quantity:totalBrokrage/0.5,
      //     earning:"-",
      //     type:"purchase"
      // });
        userr=await user.findOneAndUpdate({_id:id},{pending_orders_fund_book:cost},{new:true});
        Mailer.orderPlace(orderPlace,userr);
        res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1.
        res.setHeader("Pragma", "no-cache"); // HTTP 1.0.
        res.setHeader("Expires", "0"); // Proxies.
        res.redirect('/ordersPending');
    }else{
        res.locals.action = "nofunds";
        res.render("action");
    }
  } else {
    res.locals.title = "login";
    res.setHeader("Cross-Origin-Embedder-Policy","credentialess")
    res.setHeader("Content-Security-Policy", "default-src 'self' https://www.w3.org/2000/svg ; style-src 'self' https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css 'unsafe-inline'; frame-src 'self'  ;img-src 'self'  data: ;connect-src 'self'  ;script-src 'self' https://code.jquery.com/jquery-3.3.1.slim.min.js https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js 'unsafe-inline'");
    res.render("login");
  }
}};