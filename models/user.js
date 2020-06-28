require('date.format');
const md5 = require('md5');
const request = require('./request');


async function getToken(userAccount, userPassword) {
  const deviceTime = new Date().format('yyyy/mm/dd HH:MM:ss');
  const appVersion = process.env.APP_VERSION;
  const callTime = new Date().format('yyyymmddHHMMss');
  const paramString = `${userAccount}${userPassword}`;
  const modelId = process.env.MODEL_ID;
  const osVersion = process.env.OS_VERSION;
  const platform = process.env.PLATFORM;
  const deviceUuid = process.env.DEVICE_UUID;
  const orderNo = `${process.env.DEVICE_UUID}${callTime}`;
  const maskMd5 = md5(`Mc${orderNo}${platform}${osVersion}${modelId}${deviceUuid}${deviceTime}${appVersion}${paramString}Donalds`);
  const parm = {
    account: userAccount,
    password: userPassword,
    OrderNo: orderNo,
    mask: maskMd5,
    source_info: {
      app_version: appVersion,
      device_time: deviceTime,
      device_uuid: deviceUuid,
      model_id: modelId,
      os_version: osVersion,
      Platform: process.env.PLATFORM,
    },
  };
  const option = {
    url: 'https://api.mcddaily.com.tw/login_by_mobile',
    json: parm,
  };
  const response = await request.postRequest(option);
  return response;
}

module.exports = {
  getToken,
};
