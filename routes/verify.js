const express=require('express');
const router = express.Router();
// const verifymailandcookie=require('../middleware/verify_email_create_cookie');
const verifyController=require('../controllers/verify_email_controller');
// router.get('/:code/:id',verifymailandcookie,verifyController.verifyUser);
router.get('/:code/:id',verifyController.verifyUser);
module.exports=router;