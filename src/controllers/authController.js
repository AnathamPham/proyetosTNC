
// src/controllers/authController.js
const User = require('../models/User');

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        
        if (!user || !(await user.validatePassword(password))) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }

        req.session.userId = user._id;
        res.redirect('/dashboard');
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

exports.register = async (req, res) => {
    try {
        const { email, password, name } = req.body;
        const user = new User({ email, password, name });
        await user.save();
        
        res.redirect('/auth/login');
    } catch (error) {
        res.status(500).json({ message: 'Error en el registro' });
    }
};