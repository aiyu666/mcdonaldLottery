const { postRequest } = require('./request');
require('dotenv').config();

module.exports = async (messageContent, lineNotifiyToken = process.env.LINE_NOTIFY_TOKEN) => {
  const options = {
    url: 'https://notify-api.line.me/api/notify',
    headers: {
      'content-type': 'multipart/form-data',
      authorization: `Bearer ${lineNotifiyToken}`,
    },
    formData: { message: messageContent },
  };
  const resp = await postRequest(options);
  return resp;
};
