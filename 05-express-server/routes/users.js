// routes/users.js
const express = require('express');
const router = express.Router();

const users = [
    { id: 1, name: 'Alice', age: 25, email: 'alice@example.com' },
    { id: 2, name: 'Bob', age: 30, email: 'bob@example.com' },
    { id: 3, name: 'Charlie', age: 22, email: 'charlie@example.com' }
];


router.get('/', (req, res) => {
    res.json(users);
});

// GET /users/:id — fetch a user by ID
router.get('/:id', (req, res) => {
    const user = users.find(u => u.id === Number(req.params.id));
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
});

module.exports = router;
