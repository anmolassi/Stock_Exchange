const user = require("../models/user");
const ordersReceived=require("../models/orders_received")
const bcrypt = require("bcryptjs");
const jwt=require('jsonwebtoken');
const Mailer = require("../config/Nodemailer");
module.exports.amendOrder = async function (req, res) {
  console.log("hi");
  const token = req.cookies.jwt;
  if (token) {
    const id=await jwt.decode(token,{complete:true}).payload._id;
    let userr = await user.findOne({_id:id,"tokens.token":token});
    if(userr){
        let orderPlace=await ordersReceived.findOne({_id:req.body.order_id});
        console.log(req.body);
        console.log(orderPlace);
        if(orderPlace && 0<=Number(req.body.number_of_stocks) && parseFloat(Number(req.body.quote_total_cost)).toFixed(2)<=Number(userr.fund)-Number(userr.pending_orders_fund_book)){
            let inititalNumberOfStocks=orderPlace.totalBrokrage/0.5;
            //let costPerUnit=(orderPlace.totalCost-orderPlace.totalBrokrage)/inititalNumberOfStocks;
            let fundRelease=(inititalNumberOfStocks-req.body.number_of_stocks)*orderPlace.costPerUnit;
            fundRelease=parseFloat(fundRelease).toFixed(2);
            if(req.body.number_of_stocks==0){
                await ordersReceived.deleteOne({_id:req.body.order_id});
                let newPending_fund_book=parseFloat(Number(userr.pending_orders_fund_book)-Number(fundRelease)).toFixed(2);
                userr=await user.findOneAndUpdate({_id:id},{pending_orders_fund_book:newPending_fund_book},{new:true});
                await Mailer.orderDelete(orderPlace,userr);
            }else{
                let newTotalCost=Number(0.5+orderPlace.costPerUnit)*Number(req.body.number_of_stocks);
                orderPlace=await ordersReceived.findOneAndUpdate({_id:req.body.order_id},{totalBrokrage:0.5*Number(req.body.number_of_stocks),totalCost:newTotalCost},{new:true});
                let newPending_fund_book=parseFloat(Number(userr.pending_orders_fund_book)-Number(fundRelease)).toFixed(2);
                userr=await user.findOneAndUpdate({_id:id},{pending_orders_fund_book:newPending_fund_book},{new:true});
                console.log(orderPlace);
                await Mailer.orderAmend(orderPlace,userr);
            }
            res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1.
            res.setHeader("Pragma", "no-cache"); // HTTP 1.0.
            res.setHeader("Expires", "0"); // Proxies.
            res.redirect('/ordersPending');
        }else{
            res.locals.action="nofunds";
            res.render("action");
        }
    }else{
        res.locals.title = "login";
        res.render("login");
    }
}};