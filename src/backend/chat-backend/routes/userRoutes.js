const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');

// Register new user
router.post('/register', userController.register);

// Login user
router.post('/login', userController.login);

// Get other users (protected route)
router.get('/users', auth, userController.getOtherUsers);

module.exports = router;
