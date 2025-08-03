const express = require('express');
const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');
const path = require('path');
const app = express();
const port = process.env.PORT || 2005;

// middleware
app.use(express.static(path.join(__dirname, 'frontEndInput')));
app.use(express.urlencoded({ extended: true })); // built-in body parsing

async function startServer() {
    let conn;
    try {
        conn = await mysql.createConnection({
            host: "localhost",
            user: 'teku',
            password: 'teku123',
            database: 'teku_database'
        });
        console.log('Database connected successfully');

        await conn.execute(`
      CREATE TABLE IF NOT EXISTS loginTable (
        login_id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(50) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL
      )
    `);
        console.log('Table ensured');

        app.get('/login', (req, res) => {
            res.sendFile(path.join(__dirname, 'frontEndInput', 'index.html'));
        });

        app.post('/login', async (req, res) => {
            const { username, password } = req.body;
            if (!username || !password) {
                return res.status(400).send('username and password required');
            }

            try {
                // hash the password before storing
                const hashed = await bcrypt.hash(password, 10);

                await conn.beginTransaction();
                await conn.execute(
                    'INSERT INTO loginTable (username, password) VALUES (?, ?)',
                    [username, hashed]
                );
                await conn.commit();
                res.send('Logged in successfully');
            } catch (err) {
                if (conn) await conn.rollback();
                console.error('Insert failed:', err);
                // Handle duplicate username gracefully
                if (err.code === 'ER_DUP_ENTRY') {
                    return res.status(409).send('Username already exists');
                }
                res.status(500).send('Internal server error');
            }
        });
    } catch (error) {
        console.error('Database or table setup failed', error);
        process.exit(1);
    }
}

startServer();

app.listen(port, () => console.log(`App is running at ${port}`));
