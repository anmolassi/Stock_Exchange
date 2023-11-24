const user=require('../models/user')
const jwt=require('jsonwebtoken');
const UUID = require("uuid-v4");
async function stock(){
  const http = require('https');
  const options = {
    method: 'GET',
    hostname: 'latest-stock-price.p.rapidapi.com',
    port: null,
    path: '/any',
    headers: {
      'X-RapidAPI-Key': '3a8d8397d9msh10634f7763b5aeap16665cjsnd4331fa1e22d',
      'X-RapidAPI-Host': 'latest-stock-price.p.rapidapi.com'
    }
  };
  let body;
  return new Promise((resolve, reject) => {
      const req = http.request(options, function (res) {
          const chunks = [];
          res.on('data', function (chunk) {
              chunks.push(chunk);
          });
          res.on('end', function () {
              const body = Buffer.concat(chunks);
              const jsonData = JSON.parse(body.toString());
              console.log(jsonData);
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
module.exports.home = async function (req, res) {
  const token = req.cookies.jwt;
  if(token){
    const id=await jwt.decode(token,{complete:true}).payload._id;
    const userr = await user.findOne({_id:id,"tokens.token":token});
    if(userr&&userr.email!='admin@gmail.com'){
      let stockBazaar=await stock();
      for(let i=0;i<stockBazaar.length;i++){
        let temp={};
        temp['symbol']=stockBazaar[i]['symbol'];
        temp['open']=stockBazaar[i]['open'];
        temp['lastPrice']=stockBazaar[i]['lastPrice'];
        temp['identifier']=stockBazaar[i]['identifier'];
        temp['lossIndicator']=0; //0= loss 1=PROFIT 2= AT PAR
        if(temp['open']<temp['lastPrice']) temp['lossIndicator']=1;
        else if(temp['open']<temp['lastPrice']) temp['lossIndicator']=2;
        stockBazaar[i]=temp;
      }
      res.locals.user=userr;
      res.locals.stockBazaar=stockBazaar;
      //res.locals.lastUpdateTime=stockBazaar[0]['lastUpdateTime'];
      res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1.
      res.setHeader("Pragma", "no-cache"); // HTTP 1.0.
      res.setHeader("Expires", "0"); // Proxies.
      //res.setHeader("Cross-Origin-Embedder-Policy","credentialess")
      //res.setHeader("Content-Security-Policy", "default-src 'self' https://www.w3.org/2000/svg ; style-src 'self' https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css 'unsafe-inline'; frame-src 'self'  ;img-src 'self'  data: ;connect-src 'self'  ;script-src 'self' https://code.jquery.com/jquery-3.3.1.slim.min.js https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js 'unsafe-inline'");
      res.render('gameNavMenu');
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
    
    return res.render("welcome");
  }
};