// src/models/Course.js
const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    level: {
        type: String,
        enum: ['beginner', 'intermediate', 'advanced'],
        required: true
    },
    duration: {
        type: Number, // en horas
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    instructor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    modules: [{
        title: String,
        lessons: [{
            title: String,
            content: String,
            videoUrl: String,
            resources: [{
                title: String,
                fileUrl: String
            }]
        }]
    }],
    students: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
    category: {
        type: String,
        required: true
    },
    tags: [String],
    isPublished: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Course', courseSchema);