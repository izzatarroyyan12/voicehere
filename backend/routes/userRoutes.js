// userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { verifyToken, verifyAdmin } = require('../middlewares/auth');

// Define routes
router.post('/register', userController.registerUser); // Register a new user
router.post('/login', userController.loginUser); // User login
router.post('/logout', verifyToken, userController.logoutUser); // User logout

module.exports = router;