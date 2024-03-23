const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');


router.post('/register', authController.postRegister); // Utilisez le contrôleur de test
router.post('/login', authController.postLogin); 
router.get('/isloggedin', authController.getIsLoggedIn); 
router.get('/logout', authController.getLogout); 


module.exports = router;
