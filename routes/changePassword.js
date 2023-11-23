const express=require('express');
const router = express.Router();
const changePassword=require('../controllers/changePassword_controller');
router.get('/:key',changePassword.pageToChangePassword);
router.post('/',changePassword.setNewPassword);
module.exports=router;