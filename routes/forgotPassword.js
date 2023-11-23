const express=require('express');
const router = express.Router();
const forgotPassword=require('../controllers/forgotPassword_controller');
router.post('/',forgotPassword.generateForgotMail);
router.get('/',function(req,res){
    res.render('forgotPassword');
})
module.exports=router;