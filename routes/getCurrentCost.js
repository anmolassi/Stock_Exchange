const express=require('express');
const router = express.Router();
const adminController=require('../controllers/get_current_cost_controller');
router.get('/:identifier',adminController.getCost);
module.exports=router;