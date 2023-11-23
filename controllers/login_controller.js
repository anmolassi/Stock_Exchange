const user = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt=require('jsonwebtoken');
module.exports.logInForm = async function (req, res) {
  const token = req.cookies.jwt;
  if (token) {
    const id=jwt.decode(token,{complete:true}).payload._id;
    const userr = await user.findOne({_id:id,"tokens.token":token});
    if(userr){
      res.locals.user=userr;
      res.locals.level=userr.levelYN;
      res.redirect('/');
    }else{
      res.locals.title = "login";
      res.clearCookie('jwt');
      res.setHeader("Cross-Origin-Embedder-Policy","credentialess")
      res.setHeader("Content-Security-Policy", "default-src 'self' https://www.w3.org/2000/svg ; style-src 'self' https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css 'unsafe-inline'; frame-src 'self'  ;img-src 'self'  data: ;connect-src 'self'  ;script-src 'self' https://code.jquery.com/jquery-3.3.1.slim.min.js https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js 'unsafe-inline'");
      res.render("login");
    }
  } else {
    res.locals.title = "login";
    res.setHeader("Cross-Origin-Embedder-Policy","credentialess")
    res.setHeader("Content-Security-Policy", "default-src 'self' https://www.w3.org/2000/svg ; style-src 'self' https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css 'unsafe-inline'; frame-src 'self'  ;img-src 'self'  data: ;connect-src 'self'  ;script-src 'self' https://code.jquery.com/jquery-3.3.1.slim.min.js https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js 'unsafe-inline'");
    res.render("login");
  }
};

module.exports.logIn = async function (req, res) {
  // console.log(req.body);
  if(req.body.email==undefined||req.body.password==undefined){
    res.render('oversmart');
    return;
  }
  const userr = await user.findOne({ email: req.body.email });
  console.log("WOW!!!!!!!");
  if (userr&&userr.email!='admin@gmail.com') {
    const matchPassword = await bcrypt.compare(
      req.body.password,
      userr.password
    );
    if (matchPassword) {
      if (userr.verified == true) {
        const token = await userr.generateAuthToken();
        console.log(token);
        res.cookie("jwt", `${token}`, {
          httpOnly: true,
          maxAge: 7 * 24 * 60 * 60 * 1000,
          sameSite: 'strict',
          // secure:true
        });
        res.locals.user = userr;
        res.locals.level=userr.levelYN;
        res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1.
        res.setHeader("Pragma", "no-cache"); // HTTP 1.0.
        res.setHeader("Expires", "0"); // Proxies.
        // res.render("gameNavMenu");
        res.redirect('/');
        // res.status(200).send(`Welcome! ${userr.first_name} ${userr.last_name}.`);
      } else {
        res.locals.action = "verifyYourself";
        res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1.
        res.setHeader("Pragma", "no-cache"); // HTTP 1.0.
        res.setHeader("Expires", "0"); // Proxies.
        res.render("action");
        // res.send('not an verified account, please check verfication email in your inbox/spam folder.')
      }
    } else {
      res.locals.error=1;
      res.setHeader("Cross-Origin-Embedder-Policy","credentialess")
      res.setHeader("Content-Security-Policy", "default-src 'self' https://www.w3.org/2000/svg ; style-src 'self' https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css 'unsafe-inline'; frame-src 'self'  ;img-src 'self'  data: ;connect-src 'self'  ;script-src 'self' https://code.jquery.com/jquery-3.3.1.slim.min.js https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js 'unsafe-inline'");
      res.render("login"); //password wrong
    }
  } else {
    res.locals.error=1;
    res.setHeader("Cross-Origin-Embedder-Policy","credentialess")
    res.setHeader("Content-Security-Policy", "default-src 'self' https://www.w3.org/2000/svg ; style-src 'self' https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css 'unsafe-inline'; frame-src 'self'  ;img-src 'self'  data: ;connect-src 'self'  ;script-src 'self' https://code.jquery.com/jquery-3.3.1.slim.min.js https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js 'unsafe-inline'");
    res.render("login"); //no user found
  }
};
