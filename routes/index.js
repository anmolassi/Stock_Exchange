const express=require('express');
const router = express.Router();
const homeController=require('../controllers/home_controller');
const logOutController=require('../controllers/logout_controller');
const auth = require('../middleware/auth');
const reedirect=require('../middleware/reedirect');
const user=require('../models/user');

router.get('/',homeController.home);
router.use('/register',require('./register'));
router.use('/login',require('./login'));
router.use('/verify',require('./verify'));
router.use('/forgotPassword',require('./forgotPassword'));
router.use('/changePassword',require('./changePassword'));
router.use('/passwordChanged',require('./changePassword'));
router.use('/emailCheck',require('./emailCheck'));
router.use('/admin',require('./admin'));
router.use('/getCurrentCost',require('./getCurrentCost'));
router.use('/placeorder',require('./placeOrder'));
router.use('/ordersPending',require('./ordersPending'));
router.use('/amendorder',require('./amendOrder'));
router.use('/portfolio',require('./portfolio'));
router.use('/sellorder',require('./sellorder'));
router.use('/addmoney',require('./addMoney'));
router.use('/ordersExecuted',require('./orders_executed'));
router.get('/logout',auth,logOutController.logout);  
module.exports=router;