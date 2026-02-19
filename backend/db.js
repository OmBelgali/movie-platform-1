const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
});

const initDb = async () => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      user_id VARCHAR(50) UNIQUE NOT NULL,
      name VARCHAR(100),
      email VARCHAR(100) UNIQUE NOT NULL,
      phone VARCHAR(20),
      password TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
  try {
    const client = await pool.connect();
    await client.query(createTableQuery);
    console.log("Database initialized: 'users' table is ready.");
    client.release();
  } catch (err) {
    console.error("Error initializing database:", err.message);
  }
};

module.exports = { pool, initDb };
