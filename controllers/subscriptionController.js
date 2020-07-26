const subscription = require('../models/subscription.js');

module.exports = async (req, res) => {
  const resp = await subscription(req.body.accessToken, req.body.cronFromat);
  res.status(200);
  await res.json({
    name: resp.name,
    message: 'success',
  });
};
