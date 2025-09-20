const db = require('../db');

const createUser = async (name, email, hashedPassword, role = 'student') => {
  const res = await db.query(
    `INSERT INTO users(name,email,password,role) 
     VALUES($1,$2,$3,$4) 
     RETURNING id,name,email,role,created_at`,
    [name, email, hashedPassword, role]
  );
  return res.rows[0];
};

const findUserByEmail = async (email) => {
  const res = await db.query(`SELECT * FROM users WHERE email=$1`, [email]);
  return res.rows[0];
};

const findUserById = async (id) => {
  const res = await db.query(
    `SELECT id,name,email,role,created_at FROM users WHERE id=$1`,
    [id]
  );
  return res.rows[0];
};

module.exports = { createUser, findUserByEmail, findUserById };
