const express = require('express');
const user = require('../models/user.js');

const router = express.Router();

/* GET users listing. */
router.get('/', (req, res) => {
  res.send('get user info');
});

router.post('/', async (req, res) => {
  const resp = await user.getToken(req.body.account, req.body.password);
  await res.status(resp.statusCode);
  await res.send(resp.body);
});

module.exports = router;
