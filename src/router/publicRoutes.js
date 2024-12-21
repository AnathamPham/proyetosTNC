// src/routes/publicRoutes.js
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('public/index');
});

router.get('/courses', (req, res) => {
    res.render('public/courses');
});

router.get('/contact', (req, res) => {
    res.render('public/contact');
});

router.get('/about', (req, res) => {
    res.render('public/about');
});

module.exports = router;
