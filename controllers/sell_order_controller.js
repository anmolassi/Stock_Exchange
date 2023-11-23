const user = require("../models/user");
const ordersConfirmed=require("../models/orders_confirmed")
const bcrypt = require("bcryptjs");
const jwt=require('jsonwebtoken');
const Mailer = require("../config/Nodemailer");
const ordersExecuted=require("../models/orders_executed")
module.exports.sellOrder = async function (req, res) {
  const token = req.cookies.jwt;
  if (token) {
    const id=await jwt.decode(token,{complete:true}).payload._id;
    let userr = await user.findOne({_id:id,"tokens.token":token});
        if(userr){
            console.log(req.body);
            const orders= await ordersConfirmed.findOne({_id:req.body.order_id}).populate('user');
            console.log(orders);
            if(orders){
                if(orders.quantity==req.body.number_of_stocks){
                    await ordersConfirmed.findOneAndDelete({_id:orders._id});
                    let a=parseFloat(Number(orders.user.fund)+Number(req.body.earning)).toFixed(2);
                    await user.findOneAndUpdate({_id:orders.user},{fund:a});
                }else{
                    let a=orders.quantity-req.body.number_of_stocks;
                    await ordersConfirmed.findOneAndUpdate({_id:orders._id},{quantity:a});
                    a=parseFloat(Number(orders.user.fund)+Number(req.body.earning)).toFixed(2);
                    await user.findOneAndUpdate({_id:orders.user},{fund:a});
                }
            }
            await ordersExecuted.create({
                user:userr._id,
                order:orders._id,
                symbol:req.body.symbol,
                costPerUnit:req.body.quote_cost_unit,
                sellPerUnit:req.body.quote_sell_cost_unit,
                quantity:req.body.quote_total_brokrage/0.5,
                earning:req.body.earning,
                type:"sold"
            });
            res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1.
            res.setHeader("Pragma", "no-cache"); // HTTP 1.0.
            res.setHeader("Expires", "0"); // Proxies.
            res.redirect('/portfolio');
        }else{
            res.render("oversmart");
        }
    }else{
        res.locals.title = "login";
        res.setHeader("Cross-Origin-Embedder-Policy","credentialess")
        res.setHeader("Content-Security-Policy", "default-src 'self' https://www.w3.org/2000/svg ; style-src 'self' https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css 'unsafe-inline'; frame-src 'self'  ;img-src 'self'  data: ;connect-src 'self'  ;script-src 'self' https://code.jquery.com/jquery-3.3.1.slim.min.js https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js 'unsafe-inline'");
        res.render("login");
    }
};