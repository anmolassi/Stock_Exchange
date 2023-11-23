const express=require('express');
const router = express.Router();
const adminController=require('../controllers/place_order_controller');
router.post('/',adminController.placeOrder);
module.exports=router;