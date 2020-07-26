const { scheduleJob } = require('node-schedule');
const sendLineNotify = require('./sendLineNotify.js');
const { getLottery } = require('./lottery');
require('dotenv').config();


module.exports = (accessToken, cronFormat = process.env.CRON_FORMAT) => {
  const resp = scheduleJob(cronFormat, async (val) => {
    console.log(val);
    const getLotteryResp = await getLottery(accessToken);
    if (getLotteryResp.statusCode !== 200) return sendLineNotify(`領取失敗,因為 statusCode 拿到 ${getLotteryResp.statusCode}`);
    if (getLotteryResp.body.rc !== 1) return sendLineNotify('領取失敗');
    return sendLineNotify(`\n${getLotteryResp.body.results.coupon.object_info.title}`);
  });
  return resp;
};
