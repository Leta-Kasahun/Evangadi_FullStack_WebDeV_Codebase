// server.js

const http = require('http');
const fs = require('fs');
const path = require('path');
const EventEmitter = require('events');

// 1. Create a custom logger via EventEmitter
class Logger extends EventEmitter { }
const logger = new Logger();

// When logger emits an event, append to logfile
logger.on('log', (message) => {
    const timestamp = new Date().toISOString();
    fs.appendFile('server.log', `[${timestamp}] ${message}\n`, err => {
        if (err) console.error('Logging failed:', err);
    });
});

// 2. Watch the public directory for changes
const PUBLIC_DIR = path.join(__dirname, 'public');
fs.watch(PUBLIC_DIR, { recursive: true }, (eventType, filename) => {
    if (filename) {
        logger.emit('log', `File ${filename} ${eventType} in public/`);
    }
});

// 3. Create the HTTP server
const server = http.createServer((req, res) => {
    // Emit a request event
    logger.emit('log', `Incoming ${req.method} request for ${req.url}`);

    // Map URL to file path
    let filePath = path.join(PUBLIC_DIR, req.url === '/' ? 'index.html' : req.url);
    const ext = path.extname(filePath) || '.html';

    // Content type map
    const map = {
        '.html': 'text/html',
        '.js': 'application/javascript',
        '.css': 'text/css',
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.json': 'application/json'
    };

    // Check if the file exists
    fs.stat(filePath, (err, stats) => {
        if (err || !stats.isFile()) {
            // Not found → 404
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('404 Not Found');
            logger.emit('log', `404 Not Found: ${req.url}`);
            return;
        }

        // Stream the file to the response
        res.writeHead(200, { 'Content-Type': map[ext] || 'application/octet-stream' });
        const stream = fs.createReadStream(filePath);
        stream.pipe(res);
        stream.on('end', () => {
            logger.emit('log', `Served file: ${req.url}`);
        });
        stream.on('error', (streamErr) => {
            res.writeHead(500);
            res.end('Server Error');
            logger.emit('log', `Error serving ${req.url}: ${streamErr.message}`);
        });
    });
});

// 4. Start listening
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Static server running at http://localhost:${PORT}`);
    logger.emit('log', `Server started on port ${PORT}`);
});
