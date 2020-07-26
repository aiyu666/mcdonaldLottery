const subscription = require('../models/subscription.js');

module.exports = async (req, res) => {
  const resp = await subscription(req.body.accessToken);
  res.status(200);
  await res.json({
    name: resp.name,
    message: 'success',
  });
};
