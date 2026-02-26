const express = require('express');
const router = express.Router();
const { login, getMe, register } = require('../controllers/authController');
const { protect } = require('../middleware/auth');

// POST /api/auth/register — Initial admin setup
router.post('/register', register);

// POST /api/auth/login — Login and receive JWT
router.post('/login', login);

// GET /api/auth/me — Get current admin info (protected)
router.get('/me', protect, getMe);

module.exports = router;
