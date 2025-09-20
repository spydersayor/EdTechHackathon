// routes/courses.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { createCourse, listCourses, getCourse, addLesson } = require('../controllers/courseController');


router.get('/', listCourses);
router.post('/', auth, createCourse); // only logged-in users
router.get('/:id', getCourse);
router.post('/:id/lessons', auth, addLesson); // add lesson to course


module.exports = router;