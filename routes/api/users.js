//any API related to users (create, login)

const express = require('express');
const router = express.Router();

// #route   GET api/users
// #for     Testing route
// #access  Public (no token needed)
router.get('/', (req, res) => res.send('User route'));

module.exports = router;
