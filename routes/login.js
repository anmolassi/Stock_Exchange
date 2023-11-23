const express=require('express');
const router = express.Router();
const logInController=require('../controllers/login_controller');
router.post('/',logInController.logIn);
router.get('/',logInController.logInForm);
module.exports=router;