const express = require('express');
const lottery = require('../models/lottery.js');

const router = express.Router();

router.post('/', async (req, res) => {
  const resp = await lottery.getLottery(req.body.accessToken);
  await res.status(resp.statusCode);
  await res.json({ lottery: resp.body.results.coupon.object_info.content });
});

module.exports = router;
