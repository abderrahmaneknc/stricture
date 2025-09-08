const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware'); // middleware to verify JWT
const authMiddleware = require('../middleware/authMiddleware');


// Public routes
router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/forgetPassword', authController.forgetPassword);
router.post('/resetPassword/:token', authController.resetPassword);

// Protected routes
router.get('/profile', protect, authController.getProfile);
router.put('/updateProfile', protect, authController.updateProfile);
router.put('/changePassword', protect, authController.changePassword);
router.delete('/deleteAccount', protect, authController.deleteAccount);
router.post('/logout', protect, authController.logout);

module.exports = router;
