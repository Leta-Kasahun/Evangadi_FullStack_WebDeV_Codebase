import express from 'express';
import { createPool } from 'mysql2/promise';
import path from 'path';
import { fileURLToPath } from 'url';

// Initialize Express app and setup __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const port = 1000;

// Middleware
app.use(express.json()); // For parsing JSON request bodies
app.use(express.static(path.join(__dirname, 'public2'))); // Serve static files

// Database connection pool
const pool = createPool({
    host: "localhost",
    user: "teku",
    password: "teku123",
    database: "teku_database",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

/**
 * Initialize database - creates books table if it doesn't exist
 */
async function initializeDatabase() {
    const conn = await pool.getConnection();
    try {
        await conn.execute(`
            CREATE TABLE IF NOT EXISTS books (
                id INT AUTO_INCREMENT PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                author VARCHAR(255) NOT NULL,
                publish_year INT,
                price DECIMAL(10, 2),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);
        console.log("✅ Database initialized - books table ready");
    } catch (err) {
        console.error("❌ Database initialization failed:", err);
        throw err; // Prevent server from starting if DB setup fails
    } finally {
        conn.release();
    }
}

// ========================
// ROUTES
// ========================

/**
 * GET / - Serve the frontend HTML
 */
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public2', 'crud.html'));
});

/**
 * POST /books - Create a new book
 * Required fields: title, author
 */
app.post('/books', async (req, res) => {
    const { title, author, publish_year, price } = req.body;

    // Basic validation
    if (!title || !author) {
        return res.status(400).json({
            error: "Title and author are required fields"
        });
    }

    const conn = await pool.getConnection();
    try {
        const [result] = await conn.execute(
            'INSERT INTO books (title, author, publish_year, price) VALUES (?, ?, ?, ?)',
            [title, author, publish_year || null, price || null]
        );

        res.status(201).json({
            success: true,
            message: "Book created successfully",
            bookId: result.insertId
        });
    } catch (err) {
        console.error("Create book error:", err);
        res.status(500).json({
            error: "Failed to create book",
            details: err.message
        });
    } finally {
        conn.release();
    }
});

/**
 * GET /books - Get all books
 */
app.get('/books', async (req, res) => {
    const conn = await pool.getConnection();
    try {
        const [books] = await conn.execute('SELECT * FROM books ORDER BY created_at DESC');
        res.json({
            success: true,
            count: books.length,
            books
        });
    } catch (err) {
        console.error("Get books error:", err);
        res.status(500).json({
            error: "Failed to fetch books",
            details: err.message
        });
    } finally {
        conn.release();
    }
});

/**
 * GET /books/:id - Get a single book by ID
 */
app.get('/books/:id', async (req, res) => {
    const { id } = req.params;
    const conn = await pool.getConnection();

    try {
        const [book] = await conn.execute('SELECT * FROM books WHERE id = ?', [id]);

        if (book.length === 0) {
            return res.status(404).json({
                error: "Book not found"
            });
        }

        res.json({
            success: true,
            book: book[0]
        });
    } catch (err) {
        console.error("Get book error:", err);
        res.status(500).json({
            error: "Failed to fetch book",
            details: err.message
        });
    } finally {
        conn.release();
    }
});

/**
 * PUT /books/:id - Update a book
 */
app.put('/books/:id', async (req, res) => {
    const { id } = req.params;
    const { title, author, publish_year, price } = req.body;

    // Basic validation
    if (!title || !author) {
        return res.status(400).json({
            error: "Title and author are required fields"
        });
    }

    const conn = await pool.getConnection();
    try {
        const [result] = await conn.execute(
            'UPDATE books SET title = ?, author = ?, publish_year = ?, price = ? WHERE id = ?',
            [title, author, publish_year || null, price || null, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                error: "Book not found"
            });
        }

        res.json({
            success: true,
            message: "Book updated successfully"
        });
    } catch (err) {
        console.error("Update book error:", err);
        res.status(500).json({
            error: "Failed to update book",
            details: err.message
        });
    } finally {
        conn.release();
    }
});

/**
 * DELETE /books/:id - Delete a book
 */
app.delete('/books/:id', async (req, res) => {
    const { id } = req.params;
    const conn = await pool.getConnection();

    try {
        const [result] = await conn.execute('DELETE FROM books WHERE id = ?', [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                error: "Book not found"
            });
        }

        res.json({
            success: true,
            message: "Book deleted successfully"
        });
    } catch (err) {
        console.error("Delete book error:", err);
        res.status(500).json({
            error: "Failed to delete book",
            details: err.message
        });
    } finally {
        conn.release();
    }
});

// ========================
// ERROR HANDLING
// ========================

// 404 Handler
app.use((req, res) => {
    res.status(404).json({
        error: "Endpoint not found"
    });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error("🚨 Global error:", err);
    res.status(500).json({
        error: "Internal server error",
        details: err.message
    });
});

// ========================
// START SERVER
// ========================

initializeDatabase()
    .then(() => {
        app.listen(port, () => {
            console.log(`🚀 Server running on http://localhost:${port}`);
        });
    })
    .catch(err => {
        console.error("🔥 Failed to start server:", err);
        process.exit(1);
    });