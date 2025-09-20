const express = require('express');
const dotenv = require('dotenv');
const db = require('./db');
const { createUser, findUserByEmail } = require('./models/userModel');

dotenv.config();
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 4000;

// Test route to check DB connection
app.get('/test-db', async (req, res) => {
  try {
    const result = await db.query('SELECT NOW()');
    res.json({ success: true, time: result.rows[0] });
  } catch (err) {
    console.error('DB init error:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
