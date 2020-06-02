const express = require('express');
const user = require('../models/user.js');

const router = express.Router();

router.post('/', async (req, res) => {
  const resp = await user.getToken(req.body.account, req.body.password);
  await res.status(resp.statusCode);
  await res.json({ token: resp.body.results.member_info.access_token });
});

module.exports = router;
