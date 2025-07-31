// server.js
const express = require('express');
const path = require('path');

const port = process.env.PORT || 4005;
const app = express();

// serve files from my-profile directory (absolute path to avoid cwd issues)
app.use(express.static(path.join(__dirname, 'my-profile')));

// optional: a simple 404 for anything not found
app.use((req, res) => {
    res.status(404).send('404: Not Found');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
