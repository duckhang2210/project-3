const express = require('express');
const router = express.Router();

// #route   GET api/auth
// #for     Testing route
// #access  Public (no token needed)
router.get('/', (req, res) => res.send('Authentication route'));

module.exports = router;
