const user = require("../models/user");
const ordersConfirmed=require("../models/orders_confirmed");
const jwt=require('jsonwebtoken');
const crypto = require("crypto");
async function stock(identifier){
  const http = require('https');
  const options = {
    method: 'GET',
    hostname: 'latest-stock-price.p.rapidapi.com',
    port: null,
    path: `/any?Identifier=${encodeURIComponent(identifier)}`,
    headers: {
      'X-RapidAPI-Key': '3a8d8397d9msh10634f7763b5aeap16665cjsnd4331fa1e22d',
      'X-RapidAPI-Host': 'latest-stock-price.p.rapidapi.com'
    }
  };
  return new Promise((resolve, reject) => {
      const req = http.request(options, function (res) {
          const chunks = [];
          res.on('data', function (chunk) {
              chunks.push(chunk);
          });
          res.on('end', function () {
              const body = Buffer.concat(chunks);
              const jsonData = JSON.parse(body.toString());
              // console.log(jsonData);
              resolve(jsonData);
          });
      });
      req.on('error', (error) => {
          console.error(`Error in the request: ${error}`);
          reject(error);
      });
      req.end();
  });
}
module.exports.portfolio = async function (req, res) {
    const token = req.cookies.jwt;
    if(token){
      const id=await jwt.decode(token,{complete:true}).payload._id;
      const userr = await user.findOne({_id:id,"tokens.token":token});
      if(userr){
        let ordersList= await ordersConfirmed.find({user:id});
        let portfolio_value=0;
        let curr_portfolio_value=0;
        let curr_cost=[];
        let lost_indicator=[];
        console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh");
        for(let i=0;i<ordersList.length;i++){
            portfolio_value+=(ordersList[i].costPerUnit*ordersList[i].quantity);
            let temp=await stock(ordersList[i].identifier);
            console.log(temp[0]);
            if(temp[0]==undefined){
              i=i-1;
              continue;
            }
            curr_portfolio_value+=Number(temp[0].lastPrice)*(ordersList[i].quantity);
            curr_cost.push(Number(temp[0].lastPrice));
            if((ordersList[i].costPerUnit*ordersList[i].quantity)-(temp[0].lastPrice*ordersList[i].quantity)==0) lost_indicator.push(2);
            else if((ordersList[i].costPerUnit*ordersList[i].quantity)-(temp[0].lastPrice*ordersList[i].quantity)<0) lost_indicator.push(1);
            else lost_indicator.push(0);
        }
        res.locals.user=userr;
        res.locals.curr_cost=curr_cost;
        res.locals.lossIndicator=lost_indicator;
        res.locals.portfolio_value=parseFloat(portfolio_value).toFixed(2);
        res.locals.curr_portfolio_value=parseFloat(curr_portfolio_value).toFixed(2);
        res.locals.ordersList=ordersList;
        res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1.
        res.setHeader("Pragma", "no-cache"); // HTTP 1.0.
        res.setHeader("Expires", "0"); // Proxies.
        //res.setHeader("Cross-Origin-Embedder-Policy","credentialess")
        //res.setHeader("Content-Security-Policy", "default-src 'self' https://www.w3.org/2000/svg ; style-src 'self' https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css 'unsafe-inline'; frame-src 'self'  ;img-src 'self'  data: ;connect-src 'self'  ;script-src 'self' https://code.jquery.com/jquery-3.3.1.slim.min.js https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js 'unsafe-inline'");
        res.render('portfolio');
      }else{
        res.clearCookie('jwt');
        res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1.
        res.setHeader("Pragma", "no-cache"); // HTTP 1.0.
        res.setHeader("Expires", "0"); // Proxies.
        //res.setHeader("Cross-Origin-Embedder-Policy","credentialess")
        //res.setHeader("Content-Security-Policy", "default-src 'self' https://www.w3.org/2000/svg ; style-src 'self' https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css 'unsafe-inline'; frame-src 'self'  ;img-src 'self'  data: ;connect-src 'self'  ;script-src 'self' https://code.jquery.com/jquery-3.3.1.slim.min.js https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js 'unsafe-inline'");
        return res.render("welcome");
      }
    }
    else{
      res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1.
      res.setHeader("Pragma", "no-cache"); // HTTP 1.0.
      res.setHeader("Expires", "0"); // Proxies.
      //res.setHeader("Cross-Origin-Embedder-Policy","credentialess")
      //res.setHeader("Content-Security-Policy", "default-src 'self' https://www.w3.org/2000/svg ; style-src 'self' https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css 'unsafe-inline'; frame-src 'self'  ;img-src 'self'  data: ;connect-src 'self'  ;script-src 'self' https://code.jquery.com/jquery-3.3.1.slim.min.js https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js 'unsafe-inline'");
      return res.render("welcome");
    }
  };