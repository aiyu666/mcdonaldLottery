const lottery = require('../models/lottery');

async function getLottery(req, res) {
  const resp = await lottery.getLottery(req.body.accessToken);
  if (resp.body.rc !== 1) {
    await res.status(resp.statusCode);
    await res.json({
      errorMessage: resp.body.rm,
    });
    return;
  }
  await res.status(resp.statusCode);
  await res.json({ lottery: resp.body.results.coupon.object_info.content });
}

async function getLotteryList(req, res) {
  const getLotteryListResp = await lottery.getLotteryList(req.body.accessToken);
  if (getLotteryListResp.body.rc !== 1) {
    await res.status(getLotteryListResp.statusCode);
    await res.json({
      errorMessage: getLotteryListResp.body.rm,
    });
    return;
  }
  const lotteryNotExpire = await getLotteryListResp.body.results.coupons.filter((lotteryTarget) => lotteryTarget.object_info.redeem_end_datetime > new Date().format('yyyy/mm/dd HH:MM:ss'));
  await res.status(getLotteryListResp.statusCode);
  await res.json({ lottery: lotteryNotExpire });
}

async function getLotteryStatus(req, res) {
  const lotteryList = [];
  const getLotteryListResp = await lottery.getLotteryList(req.body.accessToken);
  const stickerListResp = await lottery.getStickerList(req.body.accessToken);
  if (getLotteryListResp.body.rc !== 1 && stickerListResp.body.rc !== 1) {
    await res.status(400);
    await res.json({
      errorMessage: 'sticker or lottery have some problem ...',
    });
    return;
  }
  const lotteryNotExpire = await getLotteryListResp.body.results.coupons.filter((lotteryTarget) => lotteryTarget.object_info.redeem_end_datetime > new Date().format('yyyy/mm/dd HH:MM:ss'));
  for (let i = 0; i < lotteryNotExpire.length; i += 1) {
    lotteryList.push(lotteryNotExpire[i].object_info.title);
  }
  await res.status(200);
  await res.json({
    lottery: lotteryList,
    totalStickersAmount: stickerListResp.body.results.stickers.length,
  });
}

module.exports = {
  getLottery,
  getLotteryList,
  getLotteryStatus,
};
