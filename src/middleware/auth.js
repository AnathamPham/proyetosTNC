// src/middleware/auth.js
const User = require('../models/User');

exports.isAuthenticated = async (req, res, next) => {
    if (!req.session.userId) {
        return res.redirect('/auth/login');
    }
    try {
        const user = await User.findById(req.session.userId);
        if (!user) {
            return res.redirect('/auth/login');
        }
        req.user = user;
        next();
    } catch (error) {
        res.redirect('/auth/login');
    }
};

exports.isNotAuthenticated = (req, res, next) => {
    if (req.session.userId) {
        return res.redirect('/dashboard');
    }
    next();
};

exports.isInstructor = (req, res, next) => {
    if (req.user.role !== 'teacher' && req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Acceso denegado' });
    }
    next();
};