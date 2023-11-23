const User = require("../models/user");
const resetPassword=require("../models/reset_password");
const ipDatabase=require('../models/permittedIP');
const bcrypt = require("bcryptjs");
const jwt=require('jsonwebtoken');
const ordersRecieved=require("../models/orders_received");
const user = require("../models/user");
const ordersConfirmed=require("../models/orders_confirmed");
const ordersExecuted=require("../models/orders_executed");
module.exports.homePage = async function (req, res) {
    var clientIp=req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    clientIp=clientIp.split(',');
    var ipaddress=clientIp[0];
    ipaddress=ipaddress.split(':');
    ipaddress=ipaddress[0];
    console.log(ipaddress);
    const ipp=await ipDatabase.findOne({ipAddress:ipaddress});
    var openaccess=false;
    if(!ipp){
        const t=await ipDatabase.findOne({ipAddress:'0.0.0.0'});
        if(t) openaccess=true;
    }
    if(ipp||openaccess){
        const token = req.cookies.jwt_admin;
        if (token) {
            const id=jwt.decode(token,{complete:true}).payload._id;
            const userr = await User.findOne({_id:id,"tokens.token":token});
            if(userr&&userr.email=='admin@gmail.com'){
                const users = await User.find({});
                res.locals.users = users;
                res.locals.admin=userr;
                res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1.
                res.setHeader("Pragma", "no-cache"); // HTTP 1.0.
                res.setHeader("Expires", "0"); // Proxies.
                res.locals.myip=ipaddress;
                res.setHeader("Cross-Origin-Embedder-Policy","credentialess")
                res.setHeader("Content-Security-Policy", "default-src 'self' https://www.w3.org/2000/svg ; style-src 'self' https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css 'unsafe-inline'; frame-src 'self'  ;img-src 'self'  data: ;connect-src 'self'  ;script-src 'self' https://code.jquery.com/jquery-3.3.1.slim.min.js https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js 'unsafe-inline'");
                res.render("Admin");
            }else{
                res.clearCookie('jwt_admin');
                res.locals.title = "Admin login";
                res.render("adminLoginForm");
            }
        } else {
            res.locals.title = "Admin login";
            res.render("adminLoginForm");
        }
    }else{
        res.locals.action='notPermitted';
        res.render("action");
    }
};
module.exports.logIn = async function (req, res) {
    var clientIp=req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    clientIp=clientIp.split(',');
    var ipaddress=clientIp[0];
    ipaddress=ipaddress.split(':');
    ipaddress=ipaddress[0];
    console.log(ipaddress);
    const ipp=await ipDatabase.findOne({ipAddress:ipaddress});
    var openaccess=false;
    if(!ipp){
        const t=await ipDatabase.findOne({ipAddress:'0.0.0.0'});
        if(t) openaccess=true;
    }
    if(ipp||openaccess){
        if(req.body.password==undefined||req.body.email==undefined){
            res.render('oversmart');
            return;
          }
        if(req.body.email=='admin@gmail.com'){
            const userr = await User.findOne({ email: req.body.email });
            const matchPassword = await bcrypt.compare(req.body.password,userr.password);
            if(matchPassword){
                const token = await userr.generateAuthToken();
                console.log(token);
                res.cookie("jwt_admin", `${token}`, {
                httpOnly: true,
                maxAge: 7 * 24 * 60 * 60 * 1000,
                sameSite: 'strict'
                });
                const users = await User.find({});
                res.locals.users = users;
                res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1.
                res.setHeader("Pragma", "no-cache"); // HTTP 1.0.
                res.setHeader("Expires", "0"); // Proxies.
                res.locals.myip=ipaddress;
                res.redirect('/admin');
            }else{
                res.locals.title = "Admin login";
                res.redirect('/admin');
            }
        }else{
            res.locals.title = "Admin login";
            res.redirect('/admin');
        }
    }else{
        res.locals.action='notPermitted';
        res.render("action");
    }
};
module.exports.locations = async function (req, res) {
    var clientIp=req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    clientIp=clientIp.split(',');
    var ipaddress=clientIp[0];
    ipaddress=ipaddress.split(':');
    ipaddress=ipaddress[0];
    console.log(ipaddress);
    const ipp=await ipDatabase.findOne({ipAddress:ipaddress});
    var openaccess=false;
    if(!ipp){
        const t=await ipDatabase.findOne({ipAddress:'0.0.0.0'});
        if(t) openaccess=true;
    }
    if(ipp||openaccess){
        const token = req.cookies.jwt_admin;
        if (token) {
            const userr = await User.findOne({
            tokens: { $elemMatch: { token: token } },
            });
            if(userr&&userr.email=='admin@gmail.com'){
                const ips = await ipDatabase.find({});
                res.locals.ips = ips;
                res.locals.myip=ipaddress;
                res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1.
                res.setHeader("Pragma", "no-cache"); // HTTP 1.0.
                res.setHeader("Expires", "0"); // Proxies.
                res.locals.myip=ipaddress;
                res.locals.admin=userr;
                res.setHeader("Cross-Origin-Embedder-Policy","credentialess")
                res.setHeader("Content-Security-Policy", "default-src 'self' https://www.w3.org/2000/svg ; style-src 'self' https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css 'unsafe-inline'; frame-src 'self'  ;img-src 'self'  data: ;connect-src 'self'  ;script-src 'self' https://code.jquery.com/jquery-3.3.1.slim.min.js https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js 'unsafe-inline'");
                res.render("AdminIPs");
            }else{
                res.redirect('/admin');
            }
        }else{
            res.redirect('/admin');
        }
    }else{
        res.locals.action='notPermitted';
        res.render("action");
    }
};
module.exports.addLocation=async function(req,res){
    var clientIp=req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    clientIp=clientIp.split(',');
    var ipaddress=clientIp[0];
    ipaddress=ipaddress.split(':');
    ipaddress=ipaddress[0];
    console.log(ipaddress);
    const ipp=await ipDatabase.findOne({ipAddress:ipaddress});
    var openaccess=false;
    if(!ipp){
        const t=await ipDatabase.findOne({ipAddress:'0.0.0.0'});
        if(t) openaccess=true;
    }
    if(ipp||openaccess){
        const token = req.cookies.jwt_admin;
        if (token) {
            const userr = await User.findOne({
            tokens: { $elemMatch: { token: token } },
            });
            if(userr&&userr.email=='admin@gmail.com'){
                try{
                    await ipDatabase.create({ipAddress:req.params.ipaddress});
                }catch(err){
                    console.log('LOCATIONS ALREADY EXISTS');
                }
                res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1.
                res.setHeader("Pragma", "no-cache"); // HTTP 1.0.
                res.setHeader("Expires", "0"); // Proxies.
                res.locals.myip=ipaddress;
                res.redirect('/admin/locations');
            }else{
                res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1.
                res.setHeader("Pragma", "no-cache"); // HTTP 1.0.
                res.setHeader("Expires", "0"); // Proxies.
                res.redirect('/admin');
            }
        }else{
            res.redirect('/admin');
        }
    }else{
        res.locals.action='notPermitted';
        res.render("action");
    }
}
module.exports.deleteLocation=async function(req,res){
    var clientIp=req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    clientIp=clientIp.split(',');
    var ipaddress=clientIp[0];
    ipaddress=ipaddress.split(':');
    ipaddress=ipaddress[0];
    console.log(ipaddress);
    const ipp=await ipDatabase.findOne({ipAddress:ipaddress});
    var openaccess=false;
    if(!ipp){
        const t=await ipDatabase.findOne({ipAddress:'0.0.0.0'});
        if(t) openaccess=true;
    }
    if(ipp||openaccess){
        const token = req.cookies.jwt_admin;
        if (token) {
            const userr = await User.findOne({
            tokens: { $elemMatch: { token: token } },
            });
            if(userr&&userr.email=='admin@gmail.com'){
                await ipDatabase.deleteOne({ipAddress:req.params.ipaddress});
                res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1.
                res.setHeader("Pragma", "no-cache"); // HTTP 1.0.
                res.setHeader("Expires", "0"); // Proxies.
                res.redirect('/admin/locations');
            }else{
                res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1.
                res.setHeader("Pragma", "no-cache"); // HTTP 1.0.
                res.setHeader("Expires", "0"); // Proxies.
                res.locals.myip=ipaddress;
                res.redirect('/admin');
            }
        }else{
            res.redirect('/admin');
        }
    }else{
        res.locals.action='notPermitted';
        res.render("action");
    }
}
module.exports.orderPending = async function (req, res) {
    var clientIp=req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    clientIp=clientIp.split(',');
    var ipaddress=clientIp[0];
    ipaddress=ipaddress.split(':');
    ipaddress=ipaddress[0];
    console.log(ipaddress);
    const ipp=await ipDatabase.findOne({ipAddress:ipaddress});
    var openaccess=false;
    if(!ipp){
        const t=await ipDatabase.findOne({ipAddress:'0.0.0.0'});
        if(t) openaccess=true;
    }
    if(ipp||openaccess){
        const token = req.cookies.jwt_admin;
        if (token) {
            const orders= await ordersRecieved.find({}).populate('user');
            res.locals.ordersList = orders;
            res.locals.myip=ipaddress;
            res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1.
            res.setHeader("Pragma", "no-cache"); // HTTP 1.0.
            res.setHeader("Expires", "0"); // Proxies.
            res.setHeader("Cross-Origin-Embedder-Policy","credentialess")
            res.setHeader("Content-Security-Policy", "default-src 'self' https://www.w3.org/2000/svg ; style-src 'self' https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css 'unsafe-inline'; frame-src 'self'  ;img-src 'self'  data: ;connect-src 'self'  ;script-src 'self' https://code.jquery.com/jquery-3.3.1.slim.min.js https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js 'unsafe-inline'");
            res.render("adminOrdersPending");
        }else{
            res.redirect('/admin');
        }
    }else{
        res.locals.action='notPermitted';
        res.render("action");
    }
};
module.exports.executeOrder = async function (req, res) {
    var clientIp=req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    clientIp=clientIp.split(',');
    var ipaddress=clientIp[0];
    ipaddress=ipaddress.split(':');
    ipaddress=ipaddress[0];
    console.log(ipaddress);
    console.log(req.body);
    const ipp=await ipDatabase.findOne({ipAddress:ipaddress});
    var openaccess=false;
    if(!ipp){
        const t=await ipDatabase.findOne({ipAddress:'0.0.0.0'});
        if(t) openaccess=true;
    }
    if(ipp||openaccess){
        const token = req.cookies.jwt_admin;
        if (token) {
            let orderDetail= await ordersRecieved.findOne({_id:req.body.order_id}).populate('user');
            let brokrageEarned=req.body.number_of_stocks*0.5;
            let amountDeduct=parseFloat((req.body.number_of_stocks*req.body.quote_cost_unit).toFixed(2))+brokrageEarned;
            let user_id=orderDetail.user;
            const oldConfirmOrder=await ordersConfirmed.findOne({order:req.body.order_id});
            if(req.body.number_of_stocks==(orderDetail.totalBrokrage)/0.5){
                if(oldConfirmOrder){
                    await ordersConfirmed.findOneAndUpdate({_id:oldConfirmOrder._id},{$inc:{quantity:req.body.number_of_stocks}});
                }else{
                    console.log(req.body);
                    await ordersConfirmed.create({user:user_id,order:req.body.order_id,symbol:req.body.symbol,costPerUnit:req.body.quote_cost_unit,quantity:req.body.number_of_stocks,identifier:req.body.identifier});
                }
                await ordersRecieved.findOneAndDelete({_id:req.body.order_id});
            }else{
                if(oldConfirmOrder){
                    await ordersConfirmed.findOneAndUpdate({_id:oldConfirmOrder._id},{$inc:{quantity:req.body.number_of_stocks}});
                }else{
                    await ordersConfirmed.create({user:user_id,order:req.body.order_id,symbol:req.body.symbol,costPerUnit:req.body.quote_cost_unit,quantity:req.body.number_of_stocks,identifier:req.body.identifier});
                }
                let c=parseFloat(orderDetail.totalBrokrage-brokrageEarned).toFixed(2);
                let d=parseFloat(orderDetail.totalCost-Number(req.body.number_of_stocks*req.body.quote_cost_unit)).toFixed(2);
                await ordersRecieved.findOneAndUpdate({_id:req.body.order_id},{totalBrokrage:c,totalCost:d});
            }
            await ordersExecuted.create({
                user:user_id._id,
                order:orderDetail._id,
                symbol:orderDetail.shareSymbol,
                costPerUnit:orderDetail.costPerUnit,
                sellPerUnit:"-",
                quantity:req.body.quote_total_brokrage/0.5,
                earning:"NA",
                type:"purchase"
            });
            let a=parseFloat(orderDetail.user.fund-amountDeduct).toFixed(2);
            let b=parseFloat(orderDetail.user.pending_orders_fund_book-amountDeduct).toFixed(2);
            await user.findOneAndUpdate({_id:user_id},{fund:a,pending_orders_fund_book:b});
            await user.findOneAndUpdate({email:"admin@gmail.com"},{$inc:{fund:brokrageEarned}});
            orderDetail= await ordersRecieved.find({});
            res.locals.ordersList = orderDetail;
            res.locals.myip=ipaddress;
            res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1.
            res.setHeader("Pragma", "no-cache"); // HTTP 1.0.
            res.setHeader("Expires", "0"); // Proxies.
            res.redirect('/admin/ordersPending');
        }else{
            res.redirect('/admin');
        }
    }else{
        res.locals.action='notPermitted';
        res.render("action");
    }
};
module.exports.logOutAdmin=async function(req,res){
    const token = req.cookies.jwt_admin;
    if (token) {
        const userr = await User.findOne({
        tokens: { $elemMatch: { token: token } },
        });
        if(userr&&userr.email=='admin@gmail.com'){
            res.clearCookie('jwt_admin');
            const u=await User.updateOne({email:'admin@gmail.com'}, {$pull: {'tokens':{token:`${token}`},function(err){
                console.log(err);
            }}});
            console.log('chlllllllllllll');
            res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1.
            res.setHeader("Pragma", "no-cache"); // HTTP 1.0.
            res.setHeader("Expires", "0"); // Proxies.
            res.redirect('/admin');
        }else{
            res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1.
            res.setHeader("Pragma", "no-cache"); // HTTP 1.0.
            res.setHeader("Expires", "0"); // Proxies.
            res.redirect('/admin');
        }
    }else{
        res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1.
        res.setHeader("Pragma", "no-cache"); // HTTP 1.0.
        res.setHeader("Expires", "0"); // Proxies.
        res.redirect('/admin');
    }
}
module.exports.deleteOrder = async function (req, res) {
    var clientIp=req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    clientIp=clientIp.split(',');
    var ipaddress=clientIp[0];
    ipaddress=ipaddress.split(':');
    ipaddress=ipaddress[0];
    console.log(ipaddress);
    console.log(req.body);
    const ipp=await ipDatabase.findOne({ipAddress:ipaddress});
    var openaccess=false;
    if(!ipp){
        const t=await ipDatabase.findOne({ipAddress:'0.0.0.0'});
        if(t) openaccess=true;
    }
    if(ipp||openaccess){
        const token = req.cookies.jwt_admin;
        if (token) {
            let orderDetail= await ordersRecieved.findOne({_id:req.body.order_id}).populate('user');
            if(orderDetail){
                let quantity=Number(orderDetail.totalBrokrage/0.5);
                let costPerUnit=Number(orderDetail.costPerUnit);
                let totalBrokrage=Number(orderDetail.totalBrokrage);
                await ordersExecuted.create({
                    user:orderDetail.user._id,
                    order:orderDetail._id,
                    symbol:orderDetail.shareSymbol,
                    costPerUnit:orderDetail.costPerUnit,
                    sellPerUnit:"-",
                    quantity:totalBrokrage/0.5,
                    earning:"-",
                    type:"delete"
                });
                //let totalFund= parseFloat(Number(quantity*costPerUnit)+totalBrokrage+orderDetail.user.fund).toFixed(2);
                let totalBook= parseFloat(Number(orderDetail.user.pending_orders_fund_book)-Number(quantity*costPerUnit)-totalBrokrage).toFixed(2);
                await ordersRecieved.findOneAndDelete({_id:orderDetail._id});
                await User.findOneAndUpdate({_id:orderDetail.user._id},{pending_orders_fund_book:totalBook})
            }
            orderDetail= await ordersRecieved.find({});
            res.locals.ordersList = orderDetail;
            res.locals.myip=ipaddress;
            res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1.
            res.setHeader("Pragma", "no-cache"); // HTTP 1.0.
            res.setHeader("Expires", "0"); // Proxies.
            res.redirect('/admin/ordersPending');
        }else{
            res.redirect('/admin');
        }
    }else{
        res.locals.action='notPermitted';
        res.render("action");
    }
};