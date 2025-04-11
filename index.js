const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
    user: process.env.DB_USER  || 'neondb_owner',
    host: process.env.DB_HOST || 'ep-royal-pond-a1ci3td3-pooler.ap-southeast-1.aws.neon.tech',
    database: process.env.DB_NAME || 'neondb',
    password: process.env.DB_PASSWORD || 'npg_fiIjUM48mHPJ',
    port: process.env.DB_PORT || 5432,
    ssl: {
        rejectUnauthorized: false
    }
});

app.get('/version', async (req, res) => {
    try {
        const result = await pool.query('SELECT version();');
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
