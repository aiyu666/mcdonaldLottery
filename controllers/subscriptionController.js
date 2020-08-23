const subscription = require('../module/subscription.js');

module.exports = async (req, res) => {
  const resp = await subscription(
    req.body.accessToken,
    req.body.lineNotifiyToken,
    req.body.cronFormat,
  );
  res.status(200);
  await res.json({
    name: resp.name,
    message: 'success',
  });
};
