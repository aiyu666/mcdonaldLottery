const lottery = require('../models/lottery');


module.exports = async (req, res) => {
  const resp = await lottery.getLottery(req.body.accessToken);
  await res.status(resp.statusCode);
  if (resp.body.rc !== 1) {
    await res.status(resp.statusCode);
    await res.json({
      errorMessage: resp.body.rm,
    });
    return;
  }
  await res.status(resp.statusCode);
  await res.json({ lottery: resp.body.results.coupon.object_info.content });
};
