// src/routes/courseRoutes.js
const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');
const { isAuthenticated, isInstructor } = require('../middleware/auth');

router.get('/', courseController.getAllCourses);
router.get('/:id', courseController.getCourseById);
router.post('/', isAuthenticated, isInstructor, courseController.createCourse);
router.post('/:id/enroll', isAuthenticated, courseController.enrollInCourse);

module.exports = router;