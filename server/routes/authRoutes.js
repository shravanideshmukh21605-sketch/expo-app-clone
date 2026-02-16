const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Registration Route
router.post('/register', authController.registerUser);

// --- ADDED THIS: Login Route ---
// Jab mobile app '/login-user' par POST request bhejega
router.post('/login-user', authController.loginUser);

module.exports = router;