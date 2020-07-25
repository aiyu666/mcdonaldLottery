const subscription = require('../models/subscription.js');

module.exports = async (req, res) => {
  subscription(req.body.accessToken);
  res.status(200);
  await res.json({
    message: 'success',
  });
};
