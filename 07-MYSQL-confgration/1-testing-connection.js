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

        // Create tables and insert data
        await createEmployeeTables(connection);

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

async function createEmployeeTables(connection) {
    try {
        // Drop tables if they exist 
        await connection.execute('DROP TABLE IF EXISTS permanent_employees');
        await connection.execute('DROP TABLE IF EXISTS contract_employees');
        await connection.execute('DROP TABLE IF EXISTS temporary_employees');

        // Create tables
        await connection.execute(`
            CREATE TABLE permanent_employees (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                email VARCHAR(100) UNIQUE NOT NULL,
                address VARCHAR(255),
                salary DECIMAL(10, 2) NOT NULL,
                status ENUM('active', 'on_leave', 'terminated') DEFAULT 'active',
                hire_date DATE NOT NULL,
                pension_number VARCHAR(20),
                bank_account VARCHAR(20),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        await connection.execute(`
            CREATE TABLE contract_employees (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                email VARCHAR(100) UNIQUE NOT NULL,
                address VARCHAR(255),
                salary DECIMAL(10, 2) NOT NULL,
                status ENUM('active', 'expired', 'terminated') DEFAULT 'active',
                contract_start DATE NOT NULL,
                contract_end DATE NOT NULL,
                contract_number VARCHAR(20),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        await connection.execute(`
            CREATE TABLE temporary_employees (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                email VARCHAR(100) UNIQUE NOT NULL,
                address VARCHAR(255),
                daily_rate DECIMAL(10, 2) NOT NULL,
                status ENUM('active', 'inactive') DEFAULT 'active',
                department VARCHAR(50),
                supervisor VARCHAR(100),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        // Insert data for permanent employees
        const permanentEmployees = [
            ["Abebe Kebede", "abebe.k@example.com", "Bole, Addis Ababa", 15000.00, "active", "2020-01-15", "PEN123456", "1000234567890"],
            ["Mekdes Hailu", "mekdes.h@example.com", "Kirkos, Addis Ababa", 18000.00, "active", "2019-05-20", "PEN123457", "1000234567891"],
            ["Tewodros Assefa", "tewodros.a@example.com", "Gulele, Addis Ababa", 22000.00, "on_leave", "2018-03-10", "PEN123458", "1000234567892"],
            ["Selamawit Girma", "selam.g@example.com", "Nifas Silk, Addis Ababa", 17000.00, "active", "2021-02-28", "PEN123459", "1000234567893"],
            ["Dawit Mekonnen", "dawit.m@example.com", "Kolfe, Addis Ababa", 25000.00, "active", "2017-11-05", "PEN123460", "1000234567894"],
            ["Hirut Worku", "hirut.w@example.com", "Arada, Addis Ababa", 19000.00, "terminated", "2020-07-15", "PEN123461", "1000234567895"]
        ];

        for (const emp of permanentEmployees) {
            await connection.execute(
                'INSERT INTO permanent_employees (name, email, address, salary, status, hire_date, pension_number, bank_account) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
                emp
            );
        }

        // Insert data for contract employees
        const contractEmployees = [
            ["Yonas Tesfaye", "yonas.t@example.com", "Bole, Addis Ababa", 20000.00, "active", "2023-01-01", "2023-12-31", "CON123456"],
            ["Alemitu Fikadu", "alemu.f@example.com", "Lideta, Addis Ababa", 18000.00, "active", "2023-02-15", "2023-08-15", "CON123457"],
            ["Getachew Solomon", "getachew.s@example.com", "Yeka, Addis Ababa", 22000.00, "expired", "2022-06-01", "2023-05-31", "CON123458"],
            ["Birtukan Asnake", "birtukan.a@example.com", "Kazanchis, Addis Ababa", 19000.00, "active", "2023-03-10", "2024-03-09", "CON123459"],
            ["Elias Demissie", "elias.d@example.com", "Piassa, Addis Ababa", 21000.00, "terminated", "2023-01-20", "2023-06-20", "CON123460"],
            ["Frehiwot Abebe", "frehiwot.a@example.com", "Saris, Addis Ababa", 17000.00, "active", "2023-04-05", "2023-10-05", "CON123461"]
        ];

        for (const emp of contractEmployees) {
            await connection.execute(
                'INSERT INTO contract_employees (name, email, address, salary, status, contract_start, contract_end, contract_number) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
                emp
            );
        }

        // Insert data for temporary employees
        const temporaryEmployees = [
            ["Mulugeta Haile", "mulugeta.h@example.com", "Bole, Addis Ababa", 500.00, "active", "Maintenance", "Abebe Kebede"],
            ["Tigist Lemma", "tigist.l@example.com", "Kirkos, Addis Ababa", 450.00, "active", "Cleaning", "Mekdes Hailu"],
            ["Ashenafi Tekle", "ashenafi.t@example.com", "Gulele, Addis Ababa", 600.00, "inactive", "Security", "Tewodros Assefa"],
            ["Rahel Yohannes", "rahel.y@example.com", "Nifas Silk, Addis Ababa", 550.00, "active", "Catering", "Selamawit Girma"],
            ["Samuel Getnet", "samuel.g@example.com", "Kolfe, Addis Ababa", 700.00, "active", "IT Support", "Dawit Mekonnen"],
            ["Zeritu Bekele", "zeritu.b@example.com", "Arada, Addis Ababa", 480.00, "inactive", "Reception", "Hirut Worku"]
        ];

        for (const emp of temporaryEmployees) {
            await connection.execute(
                'INSERT INTO temporary_employees (name, email, address, daily_rate, status, department, supervisor) VALUES (?, ?, ?, ?, ?, ?, ?)',
                emp
            );
        }

        console.log('Created 3 employee tables with Ethiopian data');
    } catch (err) {
        console.error('Error creating tables:', err);
    }
}

startServer();