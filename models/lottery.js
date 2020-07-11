const request = require('./request');
require('dotenv').config();
require('date.format');

const deviceTime = new Date().format('{YYYY}/{MM}/{DD} HH:MM:ss');

const source = {
  app_version: process.env.APP_VERSION,
  device_time: deviceTime,
  device_uuid: process.env.DEVICE_UUID,
  model_id: process.env.MODEL_ID,
  os_version: process.env.OS_VERSION,
  platform: process.env.PLATFORM,
};


async function getLottery(accessToken, sourceInfo = source) {
  const option = {
    url: `${process.env.MC_HOST}/lottery/get_item`,
    json: {
      access_token: accessToken,
      source_info: sourceInfo,
    },
  };
  const response = await request.postRequest(option);
  return response;
}


async function getLotteryList(accessToken, sourceInfo = source) {
  const option = {
    url: `${process.env.MC_HOST}/coupon/get_list`,
    json: {
      access_token: accessToken,
      source_info: sourceInfo,
    },
  };
  const response = await request.postRequest(option);
  return response;
}

async function getStickerList(accessToken, sourceInfo = source) {
  const option = {
    url: `${process.env.MC_HOST}/sticker/get_list`,
    json: {
      access_token: accessToken,
      source_info: sourceInfo,
    },
  };
  const response = await request.postRequest(option);
  return response;
}

module.exports = {
  getLottery,
  getLotteryList,
  getStickerList,
};
