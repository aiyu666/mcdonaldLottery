const { scheduleJob } = require('node-schedule');
const sendLineNotify = require('./sendLineNotify.js');
const { getLottery } = require('./lottery');
require('dotenv').config();


module.exports = (accessToken, lineNotifiyToken, cronFormat = process.env.CRON_FORMAT) => {
  const resp = scheduleJob(cronFormat, async () => {
    const getLotteryResp = await getLottery(accessToken);
    if (getLotteryResp.statusCode !== 200) return sendLineNotify(`領取失敗，因為 statusCode 拿到 ${getLotteryResp.statusCode}`, lineNotifiyToken);
    if (getLotteryResp.body.rc !== 1) return sendLineNotify(`領取失敗，因為麥當勞報報 API RC 拿到 ${getLotteryResp.body.rc}`, lineNotifiyToken);
    if (getLotteryResp.body.results.coupon.object_info.title) return sendLineNotify(`\n${getLotteryResp.body.results.coupon.object_info.title}`, lineNotifiyToken);
    return sendLineNotify('\n 歡樂貼', lineNotifiyToken);
  });
  return resp;
};
