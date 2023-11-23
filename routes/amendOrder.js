const express=require('express');
const router = express.Router();
const adminController=require('../controllers/amend_order_controller');
router.post('/',adminController.amendOrder);
module.exports=router;