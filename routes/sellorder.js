const express=require('express');
const router = express.Router();
const adminController=require('../controllers/sell_order_controller');
router.post('/',adminController.sellOrder);
module.exports=router;