const express=require('express');
const router = express.Router();
const adminController=require('../controllers/portfolio_controller');
router.get('/',adminController.portfolio);
module.exports=router;