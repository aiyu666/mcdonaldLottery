const lottery = require('../models/lottery');
require('date.format');


async function getLottery(req, res) {
  const nowDate = new Date();
  nowDate.setDate(nowDate.getDate() + 2); // The lottery expire at the day after tomorrow.
  console.log(nowDate.format('{YYYY}/{MM}/{DD} 23:59:59'));
  const getLotteryResp = await lottery.getLottery(req.body.accessToken);
  const getLotteryListResp = await lottery.getLotteryList(req.body.accessToken);
  console.log(JSON.stringify(getLotteryListResp.body.results.coupons));
  const stickerListResp = await lottery.getStickerList(req.body.accessToken);
  if (getLotteryListResp.body.rc !== 1 && stickerListResp.body.rc !== 1) {
    console.log(JSON.stringify(getLotteryListResp.body));
    console.log(JSON.stringify(stickerListResp.body));
    await res.status(400);
    await res.json({
      errorMessage: 'sticker or lottery have some problem ...',
    });
    return;
  }
  const lotteryToday = await getLotteryListResp.body.results.coupons.filter(
    (lotteryTarget) => lotteryTarget.object_info.redeem_end_datetime === nowDate.format('{YYYY}/{MM}/{DD} 23:59:59'),
  );
  const stickerToday = await stickerListResp.body.results.stickers.filter(
    (stickerTarget) => stickerTarget.obtain_datetime > new Date().format('{YYYY}/{MM}/{DD} 00:00:00'),
  );
  const todayGet = (lotteryToday.length !== 0 && stickerToday.length === 0) ? lotteryToday[0].object_info.title : '歡樂貼QQ';
  if (getLotteryResp.body.rc !== 1) {
    res.status(getLotteryResp.statusCode);
    res.json({
      errorMessage: getLotteryResp.body.rm,
    });
    return;
  }
  res.status(getLotteryResp.statusCode);
  const lotteryInfo = (getLotteryResp.body.results.coupon.object_info.title)
    ? getLotteryResp.body.results.coupon.object_info.title
    : '歡樂貼';
  res.json({
    lottery: lotteryInfo,
    todayLottery: todayGet,
  });
}

async function getLotteryStatus(req, res) {
  const lotteryList = [];
  const getLotteryListResp = await lottery.getLotteryList(req.query.accessToken);
  const stickerListResp = await lottery.getStickerList(req.query.accessToken);
  console.log(JSON.stringify(getLotteryListResp.body.results.coupons));
  if (getLotteryListResp.body.rc !== 1 && stickerListResp.body.rc !== 1) {
    await res.status(400);
    await res.json({
      errorMessage: 'sticker or lottery have some problem ...',
    });
    return;
  }
  const lotteryNotExpire = await getLotteryListResp.body.results.coupons.filter((lotteryTarget) => lotteryTarget.object_info.redeem_end_datetime > new Date().format('{YYYY}/{MM}/{DD} 00:00:00'));
  for (let i = 0; i < lotteryNotExpire.length; i += 1) {
    lotteryList.push(lotteryNotExpire[i].object_info.title);
  }
  await res.status(200);
  await res.set('Content-Type', 'application/json');
  await res.json({
    lottery: lotteryList,
    totalStickersAmount: stickerListResp.body.results.stickers.length,
  });
}

module.exports = {
  getLottery,
  getLotteryStatus,
};
