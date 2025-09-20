// models/lessonModel.js
const db = require('../db');


const createLesson = async (course_id, title, content, position=0) => {
const res = await db.query(
`INSERT INTO lessons(course_id,title,content,position) VALUES($1,$2,$3,$4) RETURNING *`,
[course_id,title,content,position]
);
return res.rows[0];
};


const listLessonsByCourse = async (course_id) => {
const res = await db.query(`SELECT * FROM lessons WHERE course_id=$1 ORDER BY position, created_at`, [course_id]);
return res.rows;
};


module.exports = { createLesson, listLessonsByCourse };