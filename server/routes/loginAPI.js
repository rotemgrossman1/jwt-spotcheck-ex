const express = require('express');
const router = express.Router();
const users = require('../../fakeDB/users');

const secretKey = 'my_secret_key';

router.post('/login', (req, res) => {
  res.send({ msg:"logged in?" });
});

module.exports = router;
