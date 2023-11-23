const User = require("../models/user");
module.exports.checkEmail = async function (req, res) {
    const user= await User.findOne({email:req.params.email});
    if(!user){
        console.log("not present")
        const data={email:1};
        res.send(data);
    }else{
        console.log("duplicate")
        const data={email:0};
        res.send(data);
    }
};