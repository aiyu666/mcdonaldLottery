const subscription = require('../models/subscription.js');

module.exports = async (req, res) => {
  const requestBody = JSON.parse(req.body);
  const resp = await subscription(requestBody.accessToken, requestBody.cronFromat);
  res.status(200);
  await res.json({
    name: resp.name,
    message: 'success',
  });
};
