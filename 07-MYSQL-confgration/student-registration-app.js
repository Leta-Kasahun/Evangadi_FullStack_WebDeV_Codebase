const express = require('express');
const mysql = require('mysql2/promise');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = process.env.PORT || 5005;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

async function startServer() {
    try {
        const connection = await mysql.createConnection({
            host: 'localhost',
            user: 'teku',
            password: 'teku123',
            database: 'teku_database'
        });
        console.log('Connected to MySQL');

        // Create tables if they don't exist
        await connection.execute(`
            CREATE TABLE IF NOT EXISTS students (
                id INT AUTO_INCREMENT PRIMARY KEY,
                first_name VARCHAR(50) NOT NULL,
                middle_name VARCHAR(50),
                last_name VARCHAR(50) NOT NULL,
                sex ENUM('Male', 'Female', 'Other') NOT NULL,
                age INT NOT NULL,
                department ENUM('Software', 'IS', 'IT', 'DS', 'CS', 'Civil') NOT NULL,
                semester ENUM('I', 'II') NOT NULL,
                year INT NOT NULL,
                registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        await connection.execute(`
            CREATE TABLE IF NOT EXISTS contacts (
                id INT AUTO_INCREMENT PRIMARY KEY,
                student_id INT NOT NULL,
                first_name VARCHAR(50) NOT NULL,
                middle_name VARCHAR(50),
                last_name VARCHAR(50) NOT NULL,
                address TEXT NOT NULL,
                phone_number VARCHAR(20) NOT NULL,
                house_number VARCHAR(20),
                FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE
            )
        `);

        // Routes
        app.get('/', (req, res) => {
            res.sendFile(path.join(__dirname, 'public', 'index.html'));
        });

        app.get('/register', (req, res) => {
            res.sendFile(path.join(__dirname, 'public', 'register.html'));
        });

        app.post('/register', async (req, res) => {
            try {
                // Begin transaction
                await connection.beginTransaction();

                // Insert student data
                const { first_name, middle_name, last_name, sex, age, department, semester, year,
                    contact_first_name, contact_middle_name, contact_last_name,
                    address, phone_number, house_number } = req.body;

                const [studentResult] = await connection.execute(
                    `INSERT INTO students 
                    (first_name, middle_name, last_name, sex, age, department, semester, year) 
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
                    [first_name, middle_name, last_name, sex, age, department, semester, year]
                );

                // Insert contact data
                await connection.execute(
                    `INSERT INTO contacts 
                    (student_id, first_name, middle_name, last_name, address, phone_number, house_number) 
                    VALUES (?, ?, ?, ?, ?, ?, ?)`,
                    [studentResult.insertId, contact_first_name, contact_middle_name,
                        contact_last_name, address, phone_number, house_number]
                );

                // Commit transaction
                await connection.commit();

                res.send(`
                    <!DOCTYPE html>
                    <html>
                    <head>
                        <title>Registration Successful</title>
                        <link rel="stylesheet" href="/styles.css">
                    </head>
                    <body>
                        <div class="container success">
                            <h1>Registration Successful!</h1>
                            <p>Student ${first_name} ${last_name} has been registered.</p>
                            <a href="/register" class="button">Register Another Student</a>
                            <a href="/students" class="button">View All Students</a>
                        </div>
                    </body>
                    </html>
                `);
            } catch (err) {
                // Rollback transaction if error occurs
                await connection.rollback();
                console.error('Registration error:', err);
                res.status(500).send(`
                    <!DOCTYPE html>
                    <html>
                    <head>
                        <title>Registration Error</title>
                        <link rel="stylesheet" href="/styles.css">
                    </head>
                    <body>
                        <div class="container error">
                            <h1>Registration Error</h1>
                            <p>${err.sqlMessage || 'An error occurred during registration'}</p>
                            <a href="/register" class="button">Try Again</a>
                        </div>
                    </body>
                    </html>
                `);
            }
        });

        app.get('/students', async (req, res) => {
            try {
                const [students] = await connection.execute(`
                    SELECT s.*, c.address, c.phone_number, c.house_number 
                    FROM students s
                    JOIN contacts c ON s.id = c.student_id
                    ORDER BY s.registration_date DESC
                `);

                let html = `
                    <!DOCTYPE html>
                    <html>
                    <head>
                        <title>Registered Students</title>
                        <link rel="stylesheet" href="/styles.css">
                    </head>
                    <body>
                        <div class="container">
                            <h1>Registered Students</h1>
                            <a href="/register" class="button">Register New Student</a>
                            <div class="table-container">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Name</th>
                                            <th>Sex</th>
                                            <th>Age</th>
                                            <th>Department</th>
                                            <th>Semester</th>
                                            <th>Year</th>
                                            <th>Contact</th>
                                            <th>Registered</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                `;

                students.forEach(student => {
                    html += `
                        <tr>
                            <td>${student.id}</td>
                            <td>${student.first_name} ${student.middle_name ? student.middle_name + ' ' : ''}${student.last_name}</td>
                            <td>${student.sex}</td>
                            <td>${student.age}</td>
                            <td>${student.department}</td>
                            <td>${student.semester}</td>
                            <td>${student.year}</td>
                            <td>${student.phone_number}</td>
                            <td>${new Date(student.registration_date).toLocaleDateString()}</td>
                        </tr>
                    `;
                });

                html += `
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </body>
                    </html>
                `;

                res.send(html);
            } catch (err) {
                console.error('Error fetching students:', err);
                res.status(500).send('Error fetching student data');
            }
        });

        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    } catch (err) {
        console.error('DB connection failed:', err);
    }
}

startServer();