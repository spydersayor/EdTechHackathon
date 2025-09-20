// controllers/authController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const userModel = require('../models/userModel');


const register = async (req, res) => {
try {
const { name, email, password, role } = req.body;
if (!name || !email || !password) return res.status(400).json({ error: 'Missing fields' });


const existing = await userModel.findUserByEmail(email);
if (existing) return res.status(400).json({ error: 'Email already registered' });


const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS) || 10;
const hashed = await bcrypt.hash(password, saltRounds);


const user = await userModel.createUser(name, email, hashed, role);
const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });
res.json({ user, token });
} catch (err) {
console.error(err);
res.status(500).json({ error: 'Server error' });
}
};


const login = async (req, res) => {
try {
const { email, password } = req.body;
if (!email || !password) return res.status(400).json({ error: 'Missing fields' });


const user = await userModel.findUserByEmail(email);
if (!user) return res.status(400).json({ error: 'Invalid credentials' });


const ok = await bcrypt.compare(password, user.password);
if (!ok) return res.status(400).json({ error: 'Invalid credentials' });


const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });
const safeUser = { id: user.id, name: user.name, email: user.email, role: user.role };
res.json({ user: safeUser, token });
} catch (err) {
console.error(err);
res.status(500).json({ error: 'Server error' });
}
};


module.exports = { register, login };