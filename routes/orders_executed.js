const express=require('express');
const router = express.Router();
const adminController=require('../controllers/orders_executed_controller');
router.get('/',adminController.home);
module.exports=router;