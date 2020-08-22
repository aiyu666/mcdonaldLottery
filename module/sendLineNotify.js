const { postRequest } = require('./request');

/**
 * @param  {String} messageContent which you want to send message content
 * @param  {String} lineNotifiyToken which you get from line official
 */
module.exports = async (messageContent, lineNotifiyToken) => {
  const options = {
    url: 'https://notify-api.line.me/api/notify',
    headers: {
      'content-type': 'multipart/form-data',
      authorization: `Bearer ${lineNotifiyToken}`,
    },
    formData: { message: messageContent },
    json: true,
  };
  const resp = await postRequest(options);
  return resp;
};
