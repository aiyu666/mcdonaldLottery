const lottery = require('../models/lottery');


module.exports = async (req, res) => {
  const resp = await lottery.getLottery(req.body.accessToken);
  await res.status(resp.statusCode);
  await res.json({
    lottery: resp.body.rm,
  });
};
