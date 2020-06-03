const request = require('./request');

async function getLottery(accessToken) {
  const deviceTime = '2020/06/04 00:25:40';
  const appVersion = '2.2.0';
  const modelId = 'MIX 3';
  const osVersion = '9';
  const platform = 'Android';
  const deviceUuid = 'device_uuid';
  const option = {
    url: 'https://api1.mcddailyapp.com/lottery/get_item',
    json: {
      access_token: accessToken,
      source_info: {
        app_version: appVersion,
        device_time: deviceTime,
        device_uuid: deviceUuid,
        model_id: modelId,
        os_version: osVersion,
        Platform: platform,
      },
    },
  };
  const response = await request.postRequest(option);
  return response;
}

module.exports = {
  getLottery,
};
