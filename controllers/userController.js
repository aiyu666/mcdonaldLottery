const user = require('../models/user.js');

module.exports = async (req, res) => {
  const resp = await user.getToken(req.body.account, req.body.password);
  if (resp.body.rc !== '1') {
    await res.status(resp.statusCode);
    await res.json({
      errorMessage: resp.body.rm,
    });
    return;
  }
  await res.status(resp.statusCode);
  await res.json({ token: resp.body.results.member_info.access_token });
};
