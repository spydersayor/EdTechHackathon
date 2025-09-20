// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const userModel = require('../models/userModel');


module.exports = async (req, res, next) => {
const authHeader = req.headers.authorization;
if (!authHeader) return res.status(401).json({ error: 'No token' });
const token = authHeader.split(' ')[1];
if (!token) return res.status(401).json({ error: 'Malformed token' });


try {
const payload = jwt.verify(token, process.env.JWT_SECRET);
const user = await userModel.findUserById(payload.id);
if (!user) return res.status(401).json({ error: 'User not found' });
req.user = user;
next();
} catch (err) {
console.error(err);
return res.status(401).json({ error: 'Invalid token' });
}
};