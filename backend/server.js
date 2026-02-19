const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const { pool, initDb } = require('./db');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Initialize Database
initDb();

// Register Endpoint
app.post('/api/register', async (req, res) => {
    const { userId, name, email, phone, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await pool.query(
            'INSERT INTO users (user_id, name, email, phone, password) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [userId, name, email, phone, hashedPassword]
        );
        res.status(201).json({ message: "User registered successfully", user: result.rows[0] });
    } catch (err) {
        console.error(err.message);
        if (err.code === '23505') {
            return res.status(400).json({ error: "User ID or Email already exists" });
        }
        res.status(500).json({ error: "Internal server error" });
    }
});

// Login Endpoint
app.post('/api/login', async (req, res) => {
    const { userId, password } = req.body;

    try {
        const result = await pool.query('SELECT * FROM users WHERE user_id = $1', [userId]);

        if (result.rows.length === 0) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        const user = result.rows[0];
        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            res.json({ message: "Login successful", user: { id: user.id, name: user.name, userId: user.user_id } });
        } else {
            res.status(401).json({ error: "Invalid credentials" });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
