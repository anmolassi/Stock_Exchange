const express=require('express');
const router = express.Router();
const adminController=require('../controllers/add_money_controller');
router.post('/',adminController.addMoney);
router.get('/',adminController.addMoneyPage);
module.exports=router;