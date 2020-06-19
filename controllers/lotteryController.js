const lottery = require('../models/lottery');

async function getLottery(req, res) {
  const nowDate = new Date();
  nowDate.setDate(nowDate.getDate() + 2);
  console.log(nowDate.format('yyyy/mm/dd 00:00:00'));
  const getLotteryResp = await lottery.getLottery(req.body.accessToken);
  const getLotteryListResp = await lottery.getLotteryList(req.body.accessToken);
  const stickerListResp = await lottery.getStickerList(req.body.accessToken);
  await console.log(getLotteryListResp.body.results.coupons[0].object_info.redeem_end_datetime);
  const lotteryToday = await getLotteryListResp.body.results.coupons.filter(
    (lotteryTarget) => lotteryTarget.object_info.redeem_end_datetime === nowDate.format('yyyy/mm/dd 23:59:59'),
  );
  const stickerToday = await stickerListResp.body.results.stickers.filter(
    (stickerTarget) => stickerTarget.obtain_datetime > new Date().format('yyyy/mm/dd 00:00:00'),
  );
  await console.log(lotteryToday);
  await console.log(stickerToday);
  const todayGet = (lotteryToday.length !== 0) ? await lotteryToday[0].object_info.title : '歡樂貼QQ';
  if (getLotteryResp.body.rc !== 1) {
    await res.status(getLotteryResp.statusCode);
    await res.json({
      errorMessage: getLotteryResp.body.rm,
    });
    return;
  }

  await res.status(getLotteryResp.statusCode);
  await res.json({
    lottery: getLotteryResp.body.results.coupon.object_info.title,
    todayLottery: todayGet,
  });
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
  getLotteryStatus,
};
