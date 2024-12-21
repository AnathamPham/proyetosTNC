// src/controllers/courseController.js
const Course = require('../models/Course');
const User = require('../models/User');

exports.getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find({ isPublished: true })
            .populate('instructor', 'name email')
            .select('-modules');
        res.json(courses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getCourseById = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id)
            .populate('instructor', 'name email')
            .populate('students', 'name email');
        
        if (!course) {
            return res.status(404).json({ message: 'Curso no encontrado' });
        }
        
        res.json(course);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createCourse = async (req, res) => {
    try {
        const course = new Course({
            ...req.body,
            instructor: req.session.userId
        });
        
        const savedCourse = await course.save();
        res.status(201).json(savedCourse);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.enrollInCourse = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        const user = await User.findById(req.session.userId);
        
        if (!course || !user) {
            return res.status(404).json({ message: 'Curso o usuario no encontrado' });
        }
        
        if (course.students.includes(user._id)) {
            return res.status(400).json({ message: 'Ya estás inscrito en este curso' });
        }
        
        course.students.push(user._id);
        user.enrolledCourses.push(course._id);
        
        await Promise.all([course.save(), user.save()]);
        res.json({ message: 'Inscripción exitosa' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};