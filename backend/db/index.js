const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

if (!process.env.DATABASE_URL) {
  console.error('❌ DATABASE_URL not set in .env');
  process.exit(1);
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // Local dev me SSL off rakho
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

// Optional logging
pool.on('connect', () => console.log('✅ Connected to PostgreSQL DB'));
pool.on('error', (err) => {
  console.error('❌ Unexpected DB error', err);
  process.exit(-1);
});

const query = (text, params) => pool.query(text, params);

module.exports = { query, pool };
