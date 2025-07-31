const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3001;

app.use(express.static(path.join(__dirname, 'public')));
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

app.get('/', (req, res) => res.send('Hello World!'));
app.use('/users', require('./routes/users'));  // Mount user routes

app.use((req, res) => res.status(404).send('404 Not Found'));
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('500 Internal Error');
});

app.listen(port, () => console.log(`Server running on port ${port}`));
