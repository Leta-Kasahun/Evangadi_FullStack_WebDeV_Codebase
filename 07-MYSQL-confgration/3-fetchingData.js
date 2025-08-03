const express = require('express');
const mysql = require('mysql2/promise');

const app = express();
const port = process.env.PORT || 3009;
app.use(express.json()); // for JSON request bodies

let connection;

async function startServer() {
  try {
    connection = await mysql.createConnection({
      host: 'localhost',
      user: 'teku',
      password: 'teku123',
      database: 'teku_database',
    });

    // ensure table exists
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS ITEMS (
        id INT AUTO_INCREMENT PRIMARY KEY,
        NAME VARCHAR(50) NOT NULL,
        QUANTITY INT NOT NULL,
        PRICE DECIMAL(15,2) NOT NULL
      )
    `);

    // insert item
    app.post('/items', async (req, res) => {
      const { name, quantity, price } = req.body;
      if (!name || quantity == null || price == null) {
        return res.status(400).json({ error: 'name, quantity, and price are required' });
      }
      try {
        const [result] = await connection.execute(
          'INSERT INTO ITEMS (NAME, QUANTITY, PRICE) VALUES (?, ?, ?)',
          [name, quantity, price]
        );
        res.status(201).json({ insertedId: result.insertId });
      } catch (err) {
        console.error('Insert failed:', err);
        res.status(500).json({ error: 'Failed to add item' });
      }
    });

    // fetch all items
    app.get('/items', async (req, res) => {
      try {
        const [items] = await connection.execute('SELECT * FROM ITEMS');
        res.json(items);
      } catch (err) {
        console.error('Fetch failed:', err);
        res.status(500).json({ error: 'Failed to fetch items' });
      }
    });

    app.listen(port, () => console.log(`Server running on port ${port}`));
  } catch (error) {
    console.error('Database connection/setup failed:', error);
    process.exit(1);
  }
}

startServer();
