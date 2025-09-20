// models/courseModel.js
const db = require('../db');


const createCourse = async (title, description, instructor_id) => {
const res = await db.query(
`INSERT INTO courses(title,description,instructor_id) VALUES($1,$2,$3) RETURNING *`,
[title, description, instructor_id]
);
return res.rows[0];
};


const listCourses = async () => {
const res = await db.query(`SELECT courses.*, users.name as instructor_name FROM courses LEFT JOIN users ON users.id = courses.instructor_id ORDER BY created_at DESC`);
return res.rows;
};


const getCourse = async (id) => {
const res = await db.query(`SELECT * FROM courses WHERE id=$1`, [id]);
return res.rows[0];
};


module.exports = { createCourse, listCourses, getCourse };