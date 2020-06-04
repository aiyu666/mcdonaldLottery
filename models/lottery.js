const request = require('./request');
require('dotenv').config();

const deviceTime = new Date().format('yyyy/mm/dd HH:MM:ss');
const appVersion = '2.2.0';
const modelId = 'MIX 3';
const osVersion = '9';
const platform = 'Android';
const deviceUuid = 'device_uuid';
const source = {
  app_version: appVersion,
  device_time: deviceTime,
  device_uuid: deviceUuid,
  model_id: modelId,
  os_version: osVersion,
  Platform: platform,
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
