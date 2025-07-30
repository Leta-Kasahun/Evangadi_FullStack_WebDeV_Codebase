const http = require('http');
const fs = require('fs');
const path = require('path');
const port = 3000;

// Create server
const server = http.createServer((req, res) => {
    // 1. Simple Hello World
    if (req.url === '/' && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Welcome to Leta’s Node.js HTTP Server!');
    }

    // 2. Serve an HTML page
    else if (req.url === '/home' && req.method === 'GET') {
        const html = `<html><body><h1>🏠 Home Page</h1><p>Node.js HTTP server is working!</p></body></html>`;
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(html);
    }

    // 3. Serve JSON data (API)
    else if (req.url === '/api/user' && req.method === 'GET') {
        const user = { name: 'Leta', role: 'Developer' };
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(user));
    }

    // 4. Handle a POST request (receive data)
    else if (req.url === '/api/contact' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', () => {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end(`Contact data received:\n${body}`);
        });
    }

    // 5. Serve a static file (text)
    else if (req.url === '/readme') {
        const filePath = path.join(__dirname, 'README.txt');
        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.writeHead(500);
                res.end('Error reading README.txt');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end(data);
            }
        });
    }

    // 6. Serve a static image (binary)
    else if (req.url === '/image') {
        const imgPath = path.join(__dirname, 'logo.png');
        fs.readFile(imgPath, (err, data) => {
            if (err) {
                res.writeHead(404);
                res.end('Image not found');
            } else {
                res.writeHead(200, { 'Content-Type': 'image/png' });
                res.end(data);
            }
        });
    }

    // 7. Send a 404 Not Found
    else if (req.url === '/notfound') {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 - Page Not Found');
    }

    // 8. Basic route with query params
    else if (req.url.startsWith('/greet')) {
        const urlObj = new URL(req.url, `http://${req.headers.host}`);
        const name = urlObj.searchParams.get('name') || 'Guest';
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(`Hello, ${name}!`);
    }

    // 9. Redirect to another route
    else if (req.url === '/redirect') {
        res.writeHead(302, { 'Location': '/home' });
        res.end();
    }

    // 10. Set custom headers (CORS example)
    else if (req.url === '/cors') {
        res.writeHead(200, {
            'Content-Type': 'text/plain',
            'Access-Control-Allow-Origin': '*',
        });
        res.end('CORS-enabled response');
    }

    // Default handler for undefined routes
    else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 - Not found');
    }
});

// Start the server
server.listen(port, () => {
    console.log(`🌐 Server running at http://localhost:${port}`);
});
