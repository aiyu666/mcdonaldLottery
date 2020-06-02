const request = require('./request');

async function getLottery(accessToken) {
  const option = {
    url: 'https://api1.mcddailyapp.com/lottery/get_item',
    json: {
      access_token: accessToken,
      source_info: {},
    },
  };
  const response = await request.postRequest(option);
  return response;
}

module.exports = {
  getLottery,
};
