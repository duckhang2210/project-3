//any API related to Profile

const express = require('express');
const router = express.Router();

// #route   GET api/profile
// #for     Testing route
// #access  Public (no token needed)
router.get('/', (req, res) => res.send('Profile route'));

module.exports = router;
