const express = require('express');
const utils = require('../src/utils/circle');

const router = express.Router();

router.get('/users/:userId', (req, res) => {
  res.json({ user: req.params.userId});
})

module.exports = router;