const express=require('express');
const router = express.Router();
const adminController=require('../controllers/emailCheck_controller');
router.get('/:email',adminController.checkEmail);
module.exports=router;