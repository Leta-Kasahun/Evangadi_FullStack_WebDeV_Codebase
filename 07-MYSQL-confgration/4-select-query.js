import express from 'express';
import { createPool } from 'mysql2/promise';
import path from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';

// Get the equivalent of __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3100;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

async function startServer() {
    const pool = createPool({
        host: "localhost",
        user: "teku",
        password: "teku123",
        database: "teku_database"
    });

    try {
        const conn = await pool.getConnection();
        console.log("Database is connected successfully");

        await conn.execute(`CREATE TABLE IF NOT EXISTS CUSTOMERS(
            cust_id int auto_increment primary key,
            name varchar(60)
        )`);
        console.log("Customer table is created");

        await conn.execute(`CREATE TABLE IF NOT EXISTS ADDRESS(
            address_id int auto_increment primary key,
            cust_id int,
            address_name varchar(40),
            FOREIGN KEY (cust_id) REFERENCES CUSTOMERS(cust_id) ON DELETE CASCADE
        )`);
        console.log("Address table is created successfully");

        await conn.execute(`CREATE TABLE IF NOT EXISTS COMPANY(
            company_id int auto_increment primary key,
            cust_id int,
            company_name varchar(45),
            FOREIGN KEY (cust_id) REFERENCES CUSTOMERS(cust_id) ON DELETE CASCADE
        )`);
        console.log('All tables are created');
        conn.release();

        app.get('/', (req, res) => {
            res.sendFile(path.join(__dirname, 'public1', 'custInfo.html'));
        });

        app.post('/insertCustomerInfo', async (req, res) => {
            const { name, address, company } = req.body;
            const conn = await pool.getConnection();
            try {
                const [customerResult] = await conn.execute(
                    'INSERT INTO CUSTOMERS(name) VALUES(?)',
                    [name]
                );
                await conn.execute(
                    'INSERT INTO ADDRESS (cust_id, address_name) VALUES(?,?)',
                    [customerResult.insertId, address]
                );
                await conn.execute(
                    'INSERT INTO COMPANY(cust_id, company_name) VALUES(?,?)',
                    [customerResult.insertId, company]
                );
                res.end('Inserted successfully!');
            } catch (err) {
                console.error(err);
                res.status(500).end('Error inserting data');
            } finally {
                conn.release();
            }
        });

        app.get('/customers', async (req, res) => {
            const conn = await pool.getConnection();
            try {
                const [results] = await conn.execute(`
                    SELECT CUSTOMERS.name, ADDRESS.address_name, COMPANY.company_name 
                    FROM CUSTOMERS 
                    JOIN ADDRESS ON CUSTOMERS.cust_id = ADDRESS.cust_id
                    JOIN COMPANY ON CUSTOMERS.cust_id = COMPANY.cust_id
                `);
                res.json(results);
            } catch (err) {
                console.error(err);
                res.status(500).json({ error: 'Error fetching data' });
            } finally {
                conn.release();
            }
        });

        app.listen(port, () => console.log(`Server is listening on port ${port}`));
    } catch (err) {
        console.error('Database connection failed:', err);
        process.exit(1);
    }
}

startServer();