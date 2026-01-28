const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController'); 
const { identification } = require('../middleware/identification');

router.post('/signup', authController.signup);

// Login route
router.post('/signin', authController.signin);

// Logout route
router.post('/signout',identification, authController.signout);

// Verify route
router.post('/verify',identification,authController.sendVerificationEmail);

// Verify sent route
router.post('/verify-send',identification,authController.verifyVerificationCode);

// Reset password route
router.post('/reset-password',identification,authController.resetPassword);

// Reset password sende route
//router.post('/reset-send',authController.changePasswordEmail);

// Accept reset password request route
//router.post('/reset-accept',authController.verifyPasswordEmailCode);

module.exports = router;