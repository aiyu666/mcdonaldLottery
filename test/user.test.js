require('dotenv').config();
const Ajv = require('ajv');
const userSchema = require('./schema/user.json');

const ajv = new Ajv();

const user = require('../module/user');

describe('Lottery integration test', () => {
  test('Can get user token', async () => {
    const resp = await user.getToken(process.env.USER_ACCOUNT, process.env.USER_PASSWORD);
    await expect(resp.statusCode).toBe(200);
    await expect(ajv.validate(userSchema.getUserToekn, resp.body)).toBe(true);
    await expect(resp.body.rc).toBe('1');
    await expect(resp.body.rm).toBe('登入成功');
  });
});
