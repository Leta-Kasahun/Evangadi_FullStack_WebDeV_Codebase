const express = require('express');
const mysql = require('mysql2/promise');

const app = express();
const port = process.env.PORT || 5005;

async function startServer() {
    try {
        const connection = await mysql.createConnection({
            host: 'localhost',
            user: 'teku',
            password: 'teku123',
            database: 'teku_database'
        });
        console.log('Connected to MySQL as teku');

        app.get('/', async (req, res) => {
            const [rows] = await connection.execute('SELECT NOW() AS now');
            res.send(`App running... DB time is ${rows[0].now}`);
        });

        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    } catch (err) {
        console.error('DB connection failed:', err);
    }
}

startServer();
