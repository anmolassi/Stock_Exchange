const nodemailer=require('nodemailer');
const userVerification=require('../models/user_verification');
const { uuid } = require('uuidv4');
let mailTransporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    // user: process.env.EMAIL,
    // pass: process.env.PASSWORD,
    user: process.env.EMAIL,
    pass: process.env.PASS,
  },
});


async function verifyNewUser(user) {
  let uniquecode = uuid();

  let verifydetails=await userVerification.create({
    userId:user._id,
    accessToken:uniquecode,
  });
  console.log(verifydetails);
  let details = {
    // from: process.env.EMAIL,
    from: process.env.EMAIL,
    to: `${user.email}`,
    subject: "Welcome to CodeEra and verify yourself",
    html: `<h2>Hi ${user.first_name} ${user.last_name}, You have successfully signed up.</h2></br>
    <h4>Click on the link to verify yourself.</h4><p><a href="${process.env.WEB_URL}/verify/${uniquecode}/${verifydetails._id}">Click here</a></p>`
  };
  mailTransporter.sendMail(details, (err) => {
    if (err) {
      console.log(err);
      console.log("it has an error");
    } else {
      console.log("email has sent !");
    }
  });
}

async function setPasswordMailSend(resetPass) {
  let uniquecode = uuid();

  // let verifydetails=await userVerification.create({
  //   userId:resetPass.user._id,
  //   accessToken:uniquecode,
  // });
  console.log(resetPass);
  let details = {
    // from: process.env.EMAIL,
    from: process.env.EMAIL,
    to: `${resetPass.user.email}`,
    subject: "Reset your password",
    html: `<h2>Hi ${resetPass.user.first_name} ${resetPass.user.last_name}, You can reset your password.</h2></br>
    <h4>Click on the link to reset your password.</h4><p><a href="${process.env.WEB_URL}/changePassword/${resetPass.accessToken}">Click here</a></p>`
  };
  mailTransporter.sendMail(details, (err) => {
    if (err) {
      console.log(err);
      console.log("it has an error");
    } else {
      console.log("email has sent !");
    }
  });
}

async function orderPlace(order,user) {
  let uniquecode = uuid();
  let details = {
    // from: process.env.EMAIL,
    from: process.env.EMAIL,
    to: `${user.email}`,
    subject: "CodeEra: Order Placed in pending queue.",
    html: `<h2>Hi ${user.first_name} ${user.last_name}, Your order has been successfully placed in pending queue.</h2></br>
    <h3>Order Details</h3>
    <div>Share Symbol: ${order.shareSymbol}</div>
    <div>Quantity Bought: ${order.totalBrokrage/0.5}</div>
    <div>Cost invested: ${order.totalCost}</div>
    <div>Fund booked: ${user.pending_orders_fund_book}</div>
    <div>Fund available for investment: ${user.fund - user.pending_orders_fund_book}</div>
    <div>Balance available: ${user.fund}</div>`
  };
  mailTransporter.sendMail(details, (err) => {
    if (err) {
      console.log(err);
      console.log("it has an error");
    } else {
      console.log("email has sent !");
    }
  });
}
async function orderAmend(order,user) {
  let uniquecode = uuid();
  let details = {
    // from: process.env.EMAIL,
    from: process.env.EMAIL,
    to: `${user.email}`,
    subject: "CodeEra: Order Amendment Update.",
    html: `<h2>Hi ${user.first_name} ${user.last_name}, Your order has been successfully amended.</h2></br>
    <h3>Order Details</h3>
    <div>Share Symbol: ${order.shareSymbol}</div>
    <div>Quantity Bought: ${order.totalBrokrage/0.5}</div>
    <div>Cost invested: ${order.totalCost}</div>
    <div>Fund booked: ${user.pending_orders_fund_book}</div>
    <div>Fund available for investment: ${user.fund - user.pending_orders_fund_book}</div>
    <div>Balance available: ${user.fund}</div>`
  };
  mailTransporter.sendMail(details, (err) => {
    if (err) {
      console.log(err);
      console.log("it has an error");
    } else {
      console.log("email has sent !");
    }
  });
}
async function orderDelete(order,user) {
  let uniquecode = uuid();
  let details = {
    // from: process.env.EMAIL,
    from: process.env.EMAIL,
    to: `${user.email}`,
    subject: "CodeEra: Order Delete.",
    html: `<h2>Hi ${user.first_name} ${user.last_name}, Your order has been successfully deleted.</h2></br>
    <h3>Order Details</h3>
    <div>Share Symbol: ${order.shareSymbol}</div>
    <div>Quantity Deleted: ${order.totalBrokrage/0.5}</div>
    <div>Fund Released: ${user.pending_orders_fund_book}</div>
    <div>Fund available for investment: ${user.fund - user.pending_orders_fund_book}</div>
    <div>Balance available: ${user.fund}</div>`
  };
  mailTransporter.sendMail(details, (err) => {
    if (err) {
      console.log(err);
      console.log("it has an error");
    } else {
      console.log("email has sent !");
    }
  });
}
module.exports={verifyNewUser,setPasswordMailSend,orderPlace,orderAmend,orderDelete};