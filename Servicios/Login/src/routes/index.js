const express = require('express');

const router = express.Router();

// Define your routes here
router.get('/', (req, res) => {
    res.send('Welcome to the Login Service');
});

router.post('/login', (req, res) => {
    // Handle login logic here
    res.send('Login route');
});

router.post('/register', (req, res) => {
    // Handle registration logic here
    res.send('Register route');
});

module.exports = router;