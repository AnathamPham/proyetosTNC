// src/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { isAuthenticated, isNotAuthenticated } = require('../middleware/auth');

router.get('/login', isNotAuthenticated, (req, res) => {
    res.render('dashboard/login');
});

router.post('/login', isNotAuthenticated, authController.login);
router.post('/register', isNotAuthenticated, authController.register);
router.get('/logout', isAuthenticated, authController.logout);

module.exports = router;