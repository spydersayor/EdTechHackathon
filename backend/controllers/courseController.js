// controllers/courseController.js
const courseModel = require('../models/courseModel');
const lessonModel = require('../models/lessonModel');


const createCourse = async (req, res) => {
try {
const { title, description } = req.body;
const instructor_id = req.user.id;
if (!title) return res.status(400).json({ error: 'Title required' });
const course = await courseModel.createCourse(title, description, instructor_id);
res.json(course);
} catch (err) {
console.error(err);
res.status(500).json({ error: 'Server error' });
}
};


const listCourses = async (req, res) => {
try {
const courses = await courseModel.listCourses();
res.json(courses);
} catch (err) {
console.error(err);
res.status(500).json({ error: 'Server error' });
}
};


const getCourse = async (req, res) => {
try {
const id = req.params.id;
const course = await courseModel.getCourse(id);
if (!course) return res.status(404).json({ error: 'Not found' });
const lessons = await lessonModel.listLessonsByCourse(id);
res.json({ course, lessons });
} catch (err) {
console.error(err);
res.status(500).json({ error: 'Server error' });
}
};


const addLesson = async (req, res) => {
try {
const course_id = req.params.id;
const { title, content, position } = req.body;
if (!title) return res.status(400).json({ error: 'Title required' });
const lesson = await lessonModel.createLesson(course_id, title, content, position);
res.json(lesson);
} catch (err) {
console.error(err);
res.status(500).json({ error: 'Server error' });
}
};


module.exports = { createCourse, listCourses, getCourse, addLesson };