const express=require('express');
const router = express.Router();
const adminController=require('../controllers/admin_controller');
router.get('/',adminController.homePage);
router.get('/ordersPending',adminController.orderPending);
router.post('/executeorder',adminController.executeOrder);
router.get('/locations',adminController.locations);
router.post('/',adminController.logIn);
router.get('/logout',adminController.logOutAdmin);
router.post('/deleteorder',adminController.deleteOrder);
// router.get('/:id',adminController.adminDetails);
// router.get('/deleteUser/:id',adminController.deleteUser);
router.get('/deleteLocation/:ipaddress',adminController.deleteLocation);
router.get('/addlocation/:ipaddress',adminController.addLocation);
module.exports=router;