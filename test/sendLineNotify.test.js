require('dotenv').config();
const Ajv = require('ajv');
const sendLineNotifySchema = require('./schema/sendLineNotify.json');
const sendLineNotify = require('../module/sendLineNotify');

const ajv = new Ajv();

describe('Send line notify integration test', () => {
  test('Can send line notify', async () => {
    const resp = await sendLineNotify('test', process.env.LINE_NOTIFY_TOKEN);
    console.log(process.env);
    console.log(`LINE_NOTIFY_TOKEN: ${process.env.LINE_NOTIFY_TOKEN}`);
    await expect(resp.statusCode).toBe(200);
    await expect(ajv.validate(sendLineNotifySchema, resp.body)).toBe(true);
    await expect(resp.body.status).toBe(200);
    await expect(resp.body.message).toBe('ok');
  });
});
