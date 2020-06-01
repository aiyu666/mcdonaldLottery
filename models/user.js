require('x-date');
const md5 = require('md5');
const request = require('./request');


async function getToken(userAccount, userPassword) {
  const deviceTime = new Date().format('yyyy/mm/dd HH:MM:ss');
  const appVersion = '2.2.0';
  const callTime = new Date().format('yyyymmddHHMMss');
  const paramString = `${userAccount}${userPassword}`;
  const modelId = 'MIX 3';
  const osVersion = '9';
  const platform = 'Android';
  const deviceUuid = 'device_uuid';
  const orderNo = `${deviceUuid}${callTime}`;
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
      Platform: platform,
    },
  };
  const option = { url: 'https://api.mcddaily.com.tw/login_by_mobile', json: parm };
  const response = await request.postRequest(option);
  return response;
}

function getUser() {
}

module.exports = {
  getToken,
  getUser,
};
