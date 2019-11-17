//any API related to users (create, login)

const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

// #route   POST api/users
// #for     Register user
// #access  Public (no token needed)
router.post(
  '/',
  [
    check('name', 'Name is required')
      .not()
      .isEmpty(),
    check('email', 'Please enter your valid EMAIL').isEmail(),
    check(
      'password',
      'Your password must contain AT LEAST 5 characters'
    ).isLength({ min: 5 })
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    res.send('User route');
  }
);

module.exports = router;
