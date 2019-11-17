//any API related to Posts

const express = require('express');
const router = express.Router();

// #route   GET api/profile
// #for     Testing route
// #access  Public (no token needed)
router.get('/', (req, res) => res.send('Posts route'));

module.exports = router;
