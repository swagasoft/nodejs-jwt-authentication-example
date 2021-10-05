const express = require('express');
const router = express.Router();
const userController = require('../controllers/user_controller');
const jwt_helper = require('../config/jwt_helper');


router.post('/login', userController.login);
router.post('/sign-up', userController.createUser);
router.get('/get-user-details', jwt_helper.verifyJwtToken, userController.getUserDetails);
router.put('/update-user-details', jwt_helper.verifyJwtToken, userController.updateUserDetails);
router.get('/get-my-profile', jwt_helper.verifyJwtToken, userController.getMyProfile);


module.exports = router;